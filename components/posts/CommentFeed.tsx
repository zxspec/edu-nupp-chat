import type { Comment } from "@prisma/client";
import { CommentItem } from "./CommentItem";
type Props = {
  comments?: Record<string, any>[];
};
export const CommentFeed = ({ comments = [] }: Props) => {
  return (
    <>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} data={comment} />;
      })}
    </>
  );
};
