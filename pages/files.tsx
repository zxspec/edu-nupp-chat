import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import FilesList from "@/components/FilesList";

export default function Files() {
  return (
    <>
      <Header label="Files" showBackArrow />
      <FileUpload />
      <FilesList />
    </>
  );
}
