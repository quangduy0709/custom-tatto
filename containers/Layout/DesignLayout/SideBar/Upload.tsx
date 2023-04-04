import Image from "next/image";
import { useState } from "react";
import CustomDropzone from "../../../../components/CustomDropzone";
import Tabs from "../../../../components/Tabs";
import { useUploadForm } from "../../../../hooks/useUploadFileProgress";
import { randID } from "../../../../utils";

interface IImages {
  id: string;
  url: string;
}

const Upload = () => {
  const [images, setImages] = useState<IImages[]>([]);
  const [loading, setLoading] = useState(false);
  const { uploadForm, progress } = useUploadForm("/api/upload");

  const [tabs, setTabs] = useState("uploads");

  const handleUploadImage = async (acceptedFiles: File[]) => {
    try {
      setLoading(true);
      let result: IImages[] = [];
      const formData = new FormData();
      for (const file of acceptedFiles) {
        formData.append("file", file as File);
      }
      if (acceptedFiles.length === 1) {
        const data = await uploadForm(formData, "put");
        result = [{ id: randID(), url: data }];
      } else {
        const data = await uploadForm(formData, "post");
        result = data.map((url: string) => ({ url, id: randID() }));
      }

      setImages((prev) => [...prev, ...result]);
      setLoading(false);
    } catch (error) {}
  };
  const tabsOpts = [
    {
      value: "uploads",
      label: "Your Uploads",
      content: (
        <div className="w-full h-full m-auto mt-6 text-center">
          {images.length ? (
            <div className="flex flex-wrap gap-4">
              {images.map((item) => {
                return (
                  <div
                    className="flex items-center justify-center relative w-24 h-24"
                    key={item.id}
                  >
                    <Image
                      src={item.url}
                      fill
                      className="absolute object-cover"
                      alt="images"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Upload an image to get started</p>
          )}
        </div>
      ),
    },
    {
      value: "guidelines",
      label: "Guidelines",
      content: (
        <div className="w-full h-full m-auto mt-6  flex flex-col gap-2">
          <p className="text-lg  text-black pt-2 font-semibold">
            When you upload
          </p>
          <ol className="list-inside list-disc">
            <li>Your image is converted to greyscale</li>
            <li>
              You agree that you own the image or have permission to use it
            </li>
          </ol>
          <p className="text-lg  text-black pt-2 font-semibold">
            Best Practices
          </p>
          <ol className="list-inside list-disc">
            <li>Use clearly defined &amp; thick linework</li>
            <li>White or neutral backgrounds work best</li>
            <li>High contrast levels in the image are recommended</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col justify-start items-center mx-4 px-4 overflow-scroll w-full">
      <CustomDropzone
        onChange={handleUploadImage}
        acceptType="image/*"
        multiple={true}
        loading={loading}
        progress={progress}
      />

      <Tabs
        current={tabs}
        onChange={(e) => setTabs(e)}
        tabs={tabsOpts}
        className="mt-4"
      />
    </div>
  );
};

export default Upload;
