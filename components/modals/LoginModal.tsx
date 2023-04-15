import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { signIn } from "next-auth/react";

export const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", { email, password });

      loginModal.onClose();
    } catch (err) {
      console.error("### error: ", err);
    } finally {
      setIsLoading(false);
    }
  }, [email, loginModal, password]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        value={email}
        placeholder="email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={password}
        placeholder="Password"
        type="password"
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using twitter?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Login"
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
