import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  supabase.auth.api.setAuthCookie(req, res);
}
