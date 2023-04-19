import { useCurrentUserFiles } from "@/hooks/useCurrentUserFiles";
import { useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
export const FilesList = () => {
  const { data } = useCurrentUserFiles();

  const deleteFileHandler = useCallback(() => {
    const result = confirm("Are you sure you want to delete this file? (y/n)");
    if (result) {
      // TODO: delete file
    }
  }, []);

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
                onClick={deleteFileHandler}
              />
            </div>
          );
        })}
    </>
  );
};

export default FilesList;
