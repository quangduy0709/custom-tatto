import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { arrayBufferToBlob } from "blob-util";
import formidable from "formidable";

const accessKeyId = process.env.CLIENT_S3_ACCESS_KEY || "";
const secretAccessKey = process.env.CLIENT_S3_SECRET_KEY || "";
const bucket = process.env.CLIENT_S3_BUCKET || "";
const domain = process.env.CLIENT_STORAGE_DOMAIN || "";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: "ap-southeast-1",
  credentials: { accessKeyId, secretAccessKey },
});

const client = new S3Client({
  region: "ap-southeast-1",
  credentials: { accessKeyId, secretAccessKey },
});

export interface FormidableParseResult {
  err: any;
  fields: formidable.Fields;
  files: formidable.Files;
}

// Url used in functions must start without "/"
const storage = {
  upload: async (file: File, url: string) => {
    try {
      const { $metadata } = await client.send(
        new PutObjectCommand({ Bucket: bucket, Key: url, Body: file })
      );
      return $metadata.httpStatusCode;
    } catch (error: any) {
      console.log(error.message);
    }
  },

  download: async (url: string) => {
    const { Body } = await client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: url.substring(1),
      })
    );
    if (!Body) return;

    const data = await Body.transformToByteArray();
    return arrayBufferToBlob(data);
  },

  deleteOne: async (url: string) => {
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: decodeURIComponent(url.substring(1)),
      })
    );
  },

  deleteMany: async (urls: string[]) => {
    await client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: urls.map((url) => ({
            Key: decodeURIComponent(url.substring(1)),
          })),
        },
      })
    );
  },
};

export const uploadImageServerSide = async (buffer: Buffer, path: string) => {
  const data = await s3
    .upload({ Bucket: bucket, Key: path, Body: buffer })
    .promise();
  return data.Location.replace(domain, "");
};

export default storage;
