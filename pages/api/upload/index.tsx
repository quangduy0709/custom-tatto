import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { MAX_SIZE } from "../../../constants";
import { uploadImageThumb } from "../../../libs/images";

export interface FormidableParseResult {
  err: any;
  fields: formidable.Fields;
  files: formidable.Files;
}

/** Config for file uploading */
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res) => {
    res.status(405).send({ message: "Method not found" });
  },
});

// Upload multiple files
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    /** Get request body return from Formidable */
    const formData: FormidableParseResult = await new Promise(
      (resolve, reject) => {
        const form = formidable({ maxFileSize: MAX_SIZE, multiples: true });

        form.parse(req, (err, fields, files) => {
          if (err) reject({ err });
          resolve({ err, fields, files });
        });
      }
    );

    if (!formData.files)
      return res.status(400).send({
        message: "Images not found",
      });

    /** File type casting */
    const files = formData.files.file as formidable.File[];

    const urls = await Promise.all(
      files.map(async (file) => await uploadImageThumb(file))
    );

    return res.status(201).json(urls);
  } catch (error) {
    res.status(400).send({
      message: "Failed to upload images",
    });
  }
});

// Upload single file
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    /** Get request body return from Formidable */
    const formData: FormidableParseResult = await new Promise(
      (resolve, reject) => {
        const form = formidable({ maxFileSize: MAX_SIZE });

        form.parse(req, (err, fields, files) => {
          if (err) reject({ err });
          resolve({ err, fields, files });
        });
      }
    );

    if (!formData.files)
      return res.status(400).send({
        message: "Image not found",
      });

    /** File type casting */
    const file = formData.files.file as formidable.File;

    const url = await uploadImageThumb(file);

    return res.status(201).json(url);
  } catch (error) {
    res.status(400).send({
      message: "Failed to upload image",
    });
  }
});

export default handler;
