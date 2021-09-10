import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";

export default async function getImageHash(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, query } = req;
  const imageUrl = query.imageUrl as string;

  switch (method) {
    case "GET":
      const data = await getPlaiceholder(imageUrl, {
        size: 16,
      });
      console.log("data", data);
      console.log("imageUrl", imageUrl);
      res.status(200).json({ base64: data.base64 });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
