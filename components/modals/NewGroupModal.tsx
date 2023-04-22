import { useNewGroupModal } from "@/hooks/useNewGroupModal";
import { Modal } from "../Modal";

export const NewGroupModal = () => {
  const { isOpen, onClose } = useNewGroupModal();
  const bodyContent = <div></div>;

  return (
    <Modal
      title="Create New Group"
      isOpen={isOpen}
      actionLabel="Create"
      onClose={onClose}
      onSubmit={() => console.log("submit")}
      body={bodyContent}
    />
  );
};
