import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";
import { supabase } from "../../lib/initSupabase";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;
  const token = headers.token;

  console.log("token", token);
  switch (method) {
    case "GET":
      const { data: user, error } = await supabase.auth.api.getUserByCookie(
        req
      );

      res.status(200).json({ success: true, user, token: headers.token });

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
