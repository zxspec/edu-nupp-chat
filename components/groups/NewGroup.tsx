import { useGroupModal } from "@/hooks/useGroupModal";
import { Button } from "../Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCallback } from "react";
import { GroupInfo } from "@/types";

export const NewGroup = () => {
  const { onOpen } = useGroupModal();
  const { data: user } = useCurrentUser();

  const clickHandler = useCallback(() => {
    if (!user) return;

    const newGroup: GroupInfo = {
      id: "",
      name: "",
      owner: user.id,
      users: [],
    };

    onOpen(newGroup);
  }, [onOpen, user]);

  return (
    <div className="p-4">
      <Button label={"New Group"} onClick={clickHandler} />
    </div>
  );
};
