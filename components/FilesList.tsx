import { useCurrentUserFiles } from "@/hooks/useCurrentUserFiles";

export const FilesList = () => {
  const { data } = useCurrentUserFiles();

  return (
    <>
      <div>Files List</div>
      {data?.length &&
        data.map(({ id, filename }) => {
          return (
            <div key={id} className="p-2">
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
                  transition
                  disabled:bg-neutral-900
                  disabled:opacity-70
                  disabled:cursor-not-allowed"
              >
                {filename}
              </a>
            </div>
          );
        })}
    </>
  );
};

export default FilesList;
