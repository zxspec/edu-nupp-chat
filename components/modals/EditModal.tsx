import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEditModal } from "@/hooks/useEditModal";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ImageUpload } from "../ImageUpload";
import { Input } from "../Input";
import { Modal } from "../Modal";

import type { OptionalString } from "@/types";

export const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id ?? "");

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState<OptionalString>();
  const [coverImage, setCoverImage] = useState<OptionalString>();
  const [name, setName] = useState<OptionalString>();
  const [username, setUsername] = useState<OptionalString>();
  const [bio, setBio] = useState<OptionalString>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        bio,
        name,
        username,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (err) {
      toast.error("Something weent wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    name,
    profileImage,
    username,
  ]);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        label="Upload profile image"
        disabled={isLoading}
        value={profileImage}
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        label="Upload Cover image"
        disabled={isLoading}
        value={coverImage}
        onChange={(image) => setCoverImage(image)}
      />

      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name ?? undefined}
        disabled={isLoading}
      />
      <Input
        placeholder="UserName"
        onChange={(e) => setUsername(e.target.value)}
        value={username ?? undefined}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio ?? undefined}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      title="Edit your profile"
      disabled={isLoading}
      isOpen={editModal.isOpen}
      actionLabel="Confirm"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};
