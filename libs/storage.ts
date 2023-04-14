import AWS from "aws-sdk";
const accessKeyId = process.env.S3_ACCESS_KEY || "";
const secretAccessKey = process.env.S3_SECRET_KEY || "";
const bucket = process.env.S3_BUCKET || "";
const domain = process.env.NEXT_PUBLIC_STORAGE_DOMAIN || "";

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: "ap-southeast-1",
  credentials: { accessKeyId, secretAccessKey },
});

export const uploadImageServerSide = async (buffer: Buffer, path: string) => {
  const data = await s3
    .upload({ Bucket: bucket, Key: path, Body: buffer })
    .promise();
  return data.Location.replace(domain, "");
};
