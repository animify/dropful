import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;
  const token = headers.token;

  switch (method) {
    case "GET":
      const { data: user, error } = await supabase.auth.api.getUser(
        token as string
      );

      if (error) return res.status(401).json({ error: error.message });
      return res.status(200).json(user);

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
