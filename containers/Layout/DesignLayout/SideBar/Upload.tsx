import Image from "next/image";
import { useState } from "react";
import CustomDropzone from "../../../../components/CustomDropzone";
import { useUploadForm } from "../../../../hooks/useUploadFileProgress";
import { randID } from "../../../../utils";
import { useDispatch } from "react-redux";
import { addLayer } from "../../../../redux/reducers/design";
import { LayerType } from "../../../../contants/design";

interface IImages {
  id: string;
  url: string;
}

const Upload = () => {
  const [images, setImages] = useState<IImages[]>([]);
  const [loading, setLoading] = useState(false);
  const { uploadForm, progress } = useUploadForm("/api/upload");
  const dispatch = useDispatch();

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

  const handleAddImage = (image: IImages) => {
    const id = randID();
    dispatch(
      addLayer({
        id: id,
        type: LayerType.IMAGE,
        x: 300,
        y: 300,
        width: 300,
        height: 300,
        url: image.url,
        rotate: 0,
      })
    );
  };

  return (
    <div className="h-full flex flex-col justify-start items-center overflow-hidden mx-4 px-4">
      <CustomDropzone
        onChange={handleUploadImage}
        acceptType="image/*"
        multiple={true}
        loading={loading}
        progress={progress}
      />

      <div className="w-full h-full m-auto mt-6 text-center overflow-auto">
        {images.length ? (
          <div className="flex flex-wrap justify-between gap-4 ">
            {images.map((item) => {
              return (
                <div
                  className="flex items-center justify-center relative w-24 h-24 cursor-pointer"
                  key={item.id}
                  onClick={() => handleAddImage(item)}
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
          <p className="text-lg font-semibold mt-4">
            Upload an image to get started
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
