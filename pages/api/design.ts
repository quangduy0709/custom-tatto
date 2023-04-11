import { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";
import puppeteer from "puppeteer";
import { SourcePath } from "../../constants";
import { uploadImageServerSide } from "../../libs/storage";
import { randID } from "../../utils";

const handler = nc({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
});

handler.post(async (req, res) => {
  try {
    const body = req.body;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1000,
      height: 1000,
    });
    await page.setContent(body);
    const content = await page.$("#design-content");

    const imageBuffer = await content!.screenshot({});

    await page.close();
    await browser.close();
    const path = `${SourcePath.TEMP}/${randID()}`;
    const url = await uploadImageServerSide(imageBuffer as Buffer, path);

    return res.status(201).json("url");
  } catch (error: any) {
    console.log(error.message);
  }
});

export default handler;
