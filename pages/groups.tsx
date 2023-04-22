import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import FilesList from "@/components/FilesList";
import { NewGroup } from "@/components/groups/NewGroup";

export default function Files() {
  return (
    <>
      <Header label="Groups" showBackArrow />
      <NewGroup />
      {/* <GroupList /> */}
    </>
  );
}
