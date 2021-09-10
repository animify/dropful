import { supabase } from "../../../lib/initSupabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, query } = req;
  const token = headers.token;
  const shortId = query.shortid;

  console.log("token", token);
  // const { error } = await supabase.auth.api.getUser(token as string);

  if (!shortId) return res.status(400).json({ error: "No team id passed" });
  // if (error) return res.status(401).json({ error: error.message });

  switch (method) {
    case "GET":
      const data = await supabase
        .from("teams")
        .select("shortid, name, images")
        .eq("shortid", shortId)
        .single();

      const images = await supabase
        .from("images")
        .select("id, width, height, base64, filename")
        .in("id", data.data?.images);

      data.data.images = images.data;

      res.status(200).json(data);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
