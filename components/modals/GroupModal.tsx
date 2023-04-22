import { useGroupModal } from "@/hooks/useGroupModal";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { useCallback, useMemo, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Checkbox } from "../Checkbox";
import { Avatar } from "../Avatar";
import toast from "react-hot-toast";
import { GroupInfo } from "@/types";
import axios from "axios";

export const GroupModal = () => {
  const { data: users } = useUsers();
  const {
    isOpen,
    onClose,
    ownerId,
    userIds,
    id: groupId,
    name,
  } = useGroupModal();
  const [groupName, setGroupName] = useState(name);

  const checkedUsers = useMemo(() => {
    return users?.map(({ id, name, username }) => {
      const isOwner = id === ownerId;
      const checked = isOwner || userIds.includes(id);
      return { userId: id, name, username, isOwner, checked };
    });
  }, [ownerId, userIds, users]);

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGroupName(event.target.value);
    },
    []
  );

  const submitHandler = useCallback(async () => {
    if (!groupName || !checkedUsers) return;

    try {
      const requestBody: GroupInfo = {
        id: groupId,
        name: groupName,
        owner: ownerId,
        users: checkedUsers.filter((u) => u.checked).map((u) => u.userId),
      };

      await axios.put("/api/groups", requestBody);

      toast.success("Group created.");
      // mutate(); // TODO
      onClose();
    } catch (err) {
      console.error("### error: ", err);
      toast.error("Something went wrong.");
    }
  }, [checkedUsers, groupId, groupName, onClose, ownerId]);

  const bodyContent = (
    <>
      <div>
        <Input
          placeholder="Enter group name"
          value={groupName}
          onChange={changeHandler}
        />
        {ownerId}
        {userIds.map((id) => (
          <div key={id}>{id}</div>
        ))}
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {checkedUsers &&
          checkedUsers.map((item) => (
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
    </>
  );

  return (
    <Modal
      title="Create New Group"
      disabled={groupName.length === 0}
      isOpen={isOpen}
      actionLabel="Create"
      onClose={onClose}
      onSubmit={submitHandler}
      body={bodyContent}
    />
  );
};
