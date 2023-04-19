import { useCallback, useRef, useState } from "react";
import axios, { AxiosRequestConfig, AxiosProgressEvent } from "axios";
import { Button } from "./Button";
import { toast } from "react-hot-toast";
import { useCurrentUserFiles } from "@/hooks/useCurrentUserFiles";

export const FileUpload = () => {
  const { mutate } = useCurrentUserFiles();
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputElement = useRef<HTMLInputElement>();

  const handleSetFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.length) {
        setFile(files[0]);
        setError(null);
        fileInputElement.current = event.target;
      }
    },
    [setFile]
  );

  const handleSubmit = useCallback(async () => {
    if (!file) return;

    setSubmitting(true);

    const data = new FormData();
    data.append("file", file);

    const config: AxiosRequestConfig = {
      onUploadProgress: function ({ loaded, total }: AxiosProgressEvent) {
        if (total) {
          const percentComplete = Math.round((loaded * 100) / total);
          setProgress(percentComplete);
        }
      },
    };

    try {
      setError(null);
      await axios.put("/api/files", data, config);
      if (fileInputElement.current) {
        fileInputElement.current.value = "";
      }
      toast.success("File uploaded");
      mutate();
    } catch (err: any) {
      toast.error("Something went wrong");
      console.error("### err", err);
      setError(err?.message);
    } finally {
      setSubmitting(false);
      setProgress(0);
    }
  }, [file, mutate]);

  return (
    <div>
      {error && <p className=" text-white text-xl">{error}</p>}
      {submitting && <p>{progress}%</p>}
      <form action="POST">
        <div>
          <label htmlFor="file">File</label>
          <input
            className="w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer"
            type="file"
            id="file"
            onChange={handleSetFile}
          />
        </div>
      </form>
      <div className="flex items-center justify-start p-4">
        <Button label="Upload file" onClick={handleSubmit} disabled={!file} />
      </div>
    </div>
  );
};
