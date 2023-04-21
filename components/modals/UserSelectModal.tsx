import { useUserSelectModal } from "@/hooks/useUserSelectModal";
import { useCallback, useMemo, useRef, useState } from "react";
import { Modal } from "../Modal";

import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "../Avatar";
import { Checkbox } from "../Checkbox";
import { useFileShareInfo } from "@/hooks/useFileShareInfo";
import axios from "axios";

export const UserSelectModal = () => {
  const { data: users = [] } = useUsers();
  const userSelectModal = useUserSelectModal();
  const { data: fileShareInfo } = useFileShareInfo(userSelectModal.fileId);

  const fileShareData = useMemo(() => {
    return users.map((user) => {
      const isOwner = user.id === fileShareInfo?.owner;
      const checked = isOwner || fileShareInfo?.users?.includes(user.id);
      return { userId: user.id, checked };
    });
  }, [fileShareInfo?.owner, fileShareInfo?.users, users]);

  const bodyContent = (
    <div className="flex flex-col gap-6 mt-4">
      {fileShareData.map((item) => (
        <div key={item.userId} className="flex flex-row gap-4">
          <Checkbox
            checked={item.checked}
            disabled={item.userId === fileShareInfo?.owner}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler = useCallback(() => {
    axios.patch(`/api/share/${userSelectModal.fileId}`, fileShareData);
    userSelectModal.onClose();
  }, [fileShareData, userSelectModal]);

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
