import { useUserSelectModal } from "@/hooks/useUserSelectModal";
import { useState } from "react";
import { Modal } from "../Modal";

import { useUsers } from "@/hooks/useUsers";
import { Avatar } from "../Avatar";
import { Checkbox } from "../Checkbox";

export const UserSelectModal = () => {
  const { data: users = [] } = useUsers();
  const userSelectModal = useUserSelectModal();
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className="flex flex-col gap-6 mt-4">
      {users.map((user: Record<string, any>) => (
        <div key={user.id} className="flex flex-row gap-4">
          <Checkbox onChange={() => {}} />
          <Avatar userId={user.id} />
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm">{user.name}</p>
            <p className="text-neutral-400 text-sm">@{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      title="Select users"
      disabled={isLoading}
      isOpen={userSelectModal.isOpen}
      actionLabel="Confirm"
      onClose={userSelectModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
    />
  );
};
