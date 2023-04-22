import { useNewGroupModal } from "@/hooks/useNewGroupModal";
import { Button } from "../Button";

export const NewGroup = () => {
  const { onOpen } = useNewGroupModal();
  return (
    <div className="p-4">
      <Button label={"New Group"} onClick={onOpen} />
    </div>
  );
};
