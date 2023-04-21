import { useUserSelectModal } from "@/hooks/useUserSelectModal";
import { useCallback, useMemo, useRef, useState } from "react";
import { Modal } from "../Modal";

import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "../Avatar";
import { Checkbox } from "../Checkbox";
import { useFileShareInfo } from "@/hooks/useFileShareInfo";
import axios from "axios";
import { FileShareInfo } from "@/types"; // TODO do PATCH request in this format
import toast from "react-hot-toast";

export const UserSelectModal = () => {
  const { data: users = [] } = useUsers();
  const userSelectModal = useUserSelectModal();
  const { data: fileShareInfo, mutate } = useFileShareInfo(
    userSelectModal.fileId
  );

  const usersShareData = useMemo(() => {
    return users.map(({ id, name, username }) => {
      const isOwner = id === fileShareInfo?.owner;
      const checked = isOwner || fileShareInfo?.users?.includes(id);
      return { userId: id, name, username, isOwner, checked };
    });
  }, [fileShareInfo?.owner, fileShareInfo?.users, users]);

  const bodyContent = (
    <div className="flex flex-col gap-6 mt-4">
      {usersShareData.map((item) => (
        <div key={item.userId} className="flex flex-row gap-4">
          <Checkbox
            checked={item.checked}
            disabled={item.isOwner}
            onChange={(event) => {
              item.checked = event.target.checked;
            }}
          />
          <Avatar userId={item.userId} />
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm">{item.name}</p>
            <p className="text-neutral-400 text-sm">@{item.username}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const closeHandler = useCallback(() => {
    userSelectModal.onClose();
  }, [userSelectModal]);

  const submitHandler = useCallback(async () => {
    if (!fileShareInfo) return;

    try {
      const requestBody: FileShareInfo = {
        ...fileShareInfo,
        users: usersShareData.filter((u) => u.checked).map((u) => u.userId),
      };

      await axios.patch(`/api/share/${userSelectModal.fileId}`, requestBody);

      toast.success("Updated sharring settings.");
      mutate();
      userSelectModal.onClose();
    } catch (err) {
      console.error("### error: ", err);
      toast.error("Something went wrong.");
    }
  }, [fileShareInfo, mutate, userSelectModal, usersShareData]);

  return (
    <Modal
      title="Select users"
      isOpen={userSelectModal.isOpen}
      actionLabel="Confirm"
      onClose={closeHandler}
      onSubmit={submitHandler}
      body={bodyContent}
    />
  );
};
