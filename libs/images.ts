import formidable from "formidable";
import sharp from "sharp";
import { SourcePath } from "../constants";
import { randID } from "../utils";
import { uploadImageServerSide } from "./storage";

export const uploadImageThumb = async (file: formidable.File) => {
  const { originalFilename, filepath } = file;
  const { width, height } = await sharp(filepath).metadata();
  // Get buffer of resized image as 512x512 pixels or smallest size
  const size = Math.min(width || 512, height || 512, 512);
  const buffer = await sharp(filepath).resize(size, size).toBuffer();
  const path = `${SourcePath.TEMP}/${randID()}-${originalFilename}`;
  return await uploadImageServerSide(buffer, path);
};
