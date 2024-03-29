import Image from "next/image";
import { useState } from "react";
import CustomDropzone from "../../../../components/CustomDropzone";
import { useUploadForm } from "../../../../hooks/useUploadFileProgress";
import { randID } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addLayer } from "../../../../redux/reducers/design";
import { LayerType } from "../../../../constants/design";
import { RootState } from "../../../../redux";

interface IImages {
  id: string;
  url: string;
  width: number;
  height: number;
}

type IThumb = Omit<IImages, "id">;

const Upload = ({ onClose }: { onClose: () => void }) => {
  const [images, setImages] = useState<IImages[]>([]);
  const [loading, setLoading] = useState(false);
  const { uploadForm, progress } = useUploadForm("/api/upload");
  const dispatch = useDispatch();
  const { size } = useSelector((state: RootState) => state.design);

  const handleUploadImage = async (acceptedFiles: File[]) => {
    try {
      setLoading(true);
      let result: IImages[] = [];
      const formData = new FormData();
      for (const file of acceptedFiles) {
        formData.append("file", file as File);
      }
      if (acceptedFiles.length === 1) {
        const data: IThumb = await uploadForm(formData, "put");
        result = [
          {
            id: randID(),
            url: data.url,
            height: data.height,
            width: data.width,
          },
        ];
      } else {
        const data: IThumb[] = await uploadForm(formData, "post");
        result = data.map((item) => ({
          id: randID(),
          url: item.url,
          height: item.height,
          width: item.width,
        }));
      }

      setImages((prev) => [...prev, ...result]);
      setLoading(false);
    } catch (error) {}
  };

  const handleAddImage = (image: IImages) => {
    const id = randID();
    const originSize = {
      width: size.scale * size.width,
      height: size.scale * size.height,
    };

    const ratio = image.width / image.height;
    let width = 0;
    let height = 0;

    if (ratio > originSize.width / originSize.height) {
      width = originSize.width;
      height = width / ratio;
    } else {
      height = originSize.height;
      width = height * ratio;
    }

    const newX = Math.abs(Math.floor((originSize.width - width) / 2));
    const newY = Math.abs(Math.floor((originSize.height - height) / 2));

    dispatch(
      addLayer({
        id: id,
        type: LayerType.IMAGE,
        x: newX,
        y: newY,
        width: width,
        height: height,
        url: image.url,
        rotate: 0,
      })
    );
    onClose();
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
                  className="h-24 w-24 border flex justify-center items-center rounded-sm relative"
                  key={item.id}
                  onClick={() => handleAddImage(item)}
                >
                  <Image
                    src={item.url}
                    className={`object-cover cursor-pointer`}
                    fill
                    alt="thumbnail"
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
