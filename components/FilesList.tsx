import { useCurrentUserFiles } from "@/hooks/useCurrentUserFiles";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
export const FilesList = () => {
  const { data, mutate } = useCurrentUserFiles();

  const deleteFileHandler = useCallback(
    async (id: string) => {
      const confirmationMeesage =
        "Are you sure you want to delete this file? (y/n)";
      if (confirm(confirmationMeesage)) {
        try {
          await axios.delete(`/api/files/${id}`);
          toast.success("File deleted");
          mutate();
        } catch (error) {
          console.error("### error: ", error);
          toast.error("Something went wrong");
        }
      }
    },
    [mutate]
  );

  return (
    <>
      <div>Files List</div>
      {data?.length &&
        data.map(({ id, filename }) => {
          return (
            <div key={id} className="flex flex-row items-center p-2">
              <a
                href={`/api/files/${id}`}
                download={filename}
                className="
                  w-full 
                  text-sky-500
                  text-lg
                  underline
                  bg-black 
                  border-none 
                  rounded-md 
                  outline-none 
                  transition"
              >
                {filename}
              </a>
              <AiOutlineDelete
                size={20}
                color="white"
                className="cursor-pointer opacity-70 hover:opacity-100 transition"
                onClick={() => deleteFileHandler(id)}
              />
            </div>
          );
        })}
    </>
  );
};

export default FilesList;
