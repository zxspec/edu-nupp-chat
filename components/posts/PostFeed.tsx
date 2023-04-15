import { usePosts } from "@/hooks/usePosts";
import { PostItem } from "./PostItem";

type Props = {
  userId?: string;
};

export const PostFeed = ({ userId }: Props) => {
  const { data: posts } = usePosts(userId);

  return (
    <>
      {posts?.map((post) => (
        <PostItem userId={userId} key={post.id} postData={post} />
      ))}
    </>
  );
};
