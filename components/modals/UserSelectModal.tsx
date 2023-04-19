import { useUserSelectModal } from "@/hooks/useUserSelectModal";
import { useState } from "react";
import { Modal } from "../Modal";

import type { OptionalString } from "@/types";

export const UserSelectModal = () => {
  const userSelectModal = useUserSelectModal();
  const [isLoading, setIsLoading] = useState(false);
  const bodyContent = <>{"Body Content"}</>;

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
