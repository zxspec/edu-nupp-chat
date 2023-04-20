import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { ClickableAvatar } from "../ClickableAvatar";

import type { PostWithUserAndComments } from "@/types";
import { useLike } from "@/hooks/useLike";

type Props = { postData: PostWithUserAndComments; userId?: string };

export const PostItem = ({ postData, userId }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({
    postId: postData.id,
    userId: userId ?? "",
  });

  const goToUser = useCallback(
    (event: any) => {
      (event as Event).stopPropagation();
      const url = `/users/${postData.user.id}`;
      router.push(url);
    },
    [postData.user.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${postData.id}`);
  }, [postData.id, router]);

  const onLike = useCallback(
    (event: any) => {
      (event as Event).stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
      }

      toggleLike();
    },
    [currentUser, loginModal, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!postData.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(postData.createdAt));
  }, [postData.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-800 transition"
    >
      <div className="flex flex-row gap-3 items-start">
        <ClickableAvatar userId={postData.user.id} />
        <div>
          <div className="flex flex-row items-center gap-3">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {postData.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{postData.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{postData.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{postData.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{postData.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
