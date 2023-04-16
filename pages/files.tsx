import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";

export default function Files() {
  return (
    <>
      <Header label="Files" showBackArrow />
      <FileUpload />
    </>
  );
}
