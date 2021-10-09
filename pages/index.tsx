import React, { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import Dropzone from "../components/Dropzone";
import ImageList from "../components/ImageList";
import Grid from "../components/Grid";
import { Auth, Space, Typography } from "@supabase/ui";
import useSWR from "swr";
import { useSupabase } from "use-supabase";

type ViewType =
  | "sign_in"
  | "sign_up"
  | "forgotten_password"
  | "magic_link"
  | "update_password";

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

export default function IndexPage() {
  const { user, session } = Auth.useUser();
  const { data, error } = useSWR(
    session ? ["/api/user", session.access_token] : null,
    fetcher
  );
  const [authView, setAuthView] = useState<ViewType>("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("forgotten_password");
        if (event === "USER_UPDATED")
          setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (!user)
    return (
      <Space direction="vertical" size={8}>
        <div>
          <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
          <Typography.Title level={3}>
            Welcome to Supabase Auth
          </Typography.Title>
        </div>
        <Auth
          supabaseClient={supabase}
          providers={["google", "github"]}
          view={authView}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </Space>
    );

  return (
    <>
      {!user ? (
        <div className="w-full h-full flex flex-col justify-center items-center p-4"></div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          <Dropzone />
          <Grid />
          <button
            className="btn-black w-full mt-12"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.log("Error logging out:", error.message);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
