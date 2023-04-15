import Form from "@/components/Form";
import { PostFeed } from "@/components/posts/PostFeed";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header label="home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
