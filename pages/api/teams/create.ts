import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/initSupabase";

export default async function getTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, query } = req;
  const token = headers.token;
  const shortId = query.shortId;
  const name = query.name;

  if (!shortId || !name)
    return res.status(400).json({ error: "No team id passed" });
  // if (error) return res.status(401).json({ error: error.message });

  switch (method) {
    case "GET":
      const data = await supabase.from("teams").insert({ name, shortId });

      res.status(200).json(data);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
