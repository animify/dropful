import Link from "next/link";
import { Card, Typography, Space } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";

export default function Profile() {
  const user = supabase.auth.session();
  console.log("user", user);

  return <div style={{ maxWidth: "420px", margin: "96px auto" }}></div>;
}
