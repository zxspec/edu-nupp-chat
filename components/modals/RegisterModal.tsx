import axios from "axios";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";

import { Input } from "../Input";
import { Modal } from "../Modal";

export const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created.");

      const signInResult = signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (err) {
      console.error("### error: ", err);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, username, name, registerModal]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
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
        value={name}
        placeholder="name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={username}
        placeholder="username"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
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
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Create an account"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
