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
    console.log("🚀 ~ file: test.ts:18 ~ handler.post ~ body:", body);

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
    console.log("🚀 ~ file: test.ts:31 ~ handler.post ~ content:", content);

    const imageBuffer = await content!.screenshot({});
    console.log(
      "🚀 ~ file: test.ts:34 ~ handler.post ~ imageBuffer:",
      imageBuffer
    );

    await page.close();
    await browser.close();
    const path = `${SourcePath.TEMP}/${randID()}`;
    const url = await uploadImageServerSide(imageBuffer as Buffer, path);
    console.log("🚀 ~ file: design.ts:48 ~ handler.post ~ url:", url);

    return res.status(201).json("url");
  } catch (error) {
    console.log(error.message);
  }
});

export default handler;
