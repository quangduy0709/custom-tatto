import { CSSProperties, useCallback } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { BiImageAdd } from "react-icons/bi";
import ProgressBar from "../ProgressBar";

interface IProps {
  onChange: (file: File[]) => void;
  acceptType?: string | string[];
  loading?: boolean;
  multiple?: boolean;
  progress?: number;
}

interface IImage extends File {
  url?: string;
}

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderStyle: "dashed",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

const CustomDropzone = ({
  onChange,
  acceptType,
  loading,
  multiple = false,
  progress,
}: IProps): JSX.Element => {
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        return;
      }
      //Create thumbnail urls
      acceptedFiles.map((file: File) => {
        return Object.assign(file, {
          url: file.type.includes("image") ? URL.createObjectURL(file) : null,
        });
      });
      onChange(acceptedFiles);
    },

    [onChange]
  );

  return (
    <Dropzone onDrop={onDrop} disabled={loading} multiple={multiple}>
      {({ getRootProps, getInputProps }) => (
        <section className="w-full">
          <div
            {...getRootProps({
              style: baseStyle,
            })}
          >
            <div
              id="dropzone"
              className="w-full max-w-md mt-2 md:mt-6 border-[3px] border-dashed min-h-[150px] flex items-center justify-center m-auto flex-wrap"
            >
              {progress && progress < 100 ? (
                <ProgressBar progress={progress} />
              ) : (
                <div className="flex flex-col w-full items-center text-xl font-semibold">
                  <input {...getInputProps()} />
                  <BiImageAdd className="w-10 h-10" />
                  Drag and drop or <span className="underline">browse</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default CustomDropzone;
