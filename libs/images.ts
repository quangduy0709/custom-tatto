import formidable from "formidable";
import sharp from "sharp";
import { SourcePath } from "../constants";
import { randID } from "../utils";
import { uploadImageServerSide } from "./storage";

interface IThumb {
  url: string;
  width: number;
  height: number;
}

export const uploadImageThumb = async (
  file: formidable.File
): Promise<IThumb> => {
  const { originalFilename, filepath } = file;
  const { width, height } = await sharp(filepath).metadata();
  // if (!width || !height) return;
  const ratio = Number(width) / Number(height);
  const newWidth = ratio > 1 ? ratio * 512 : 512;
  const newHeight = ratio > 1 ? 512 : 512 / ratio;

  const buffer = await sharp(filepath)
    .resize(Math.round(newWidth), Math.round(newHeight))
    .toBuffer();
  const path = `${SourcePath.TEMP}/${randID()}-${originalFilename}`;
  const url = await uploadImageServerSide(buffer, path);
  return {
    url,
    width: newWidth,
    height: newHeight,
  };
};
