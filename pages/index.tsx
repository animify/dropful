import React, { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import Dropzone from "../components/Dropzone";
import ImageList from "../components/ImageList";
import Grid from "../components/Grid";
import useSWR from "swr";
import Auth from "../components/auth";

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
  const user = supabase.auth.user();

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (event === "PASSWORD_RECOVERY") setAuthView("forgotten_password");
  //       if (event === "USER_UPDATED")
  //         setTimeout(() => setAuthView("sign_in"), 1000);
  //       // Send session to /api/auth route to set the auth cookie.
  //       // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
  //       fetch("/api/auth", {
  //         method: "POST",
  //         headers: new Headers({ "Content-Type": "application/json" }),
  //         credentials: "same-origin",
  //         body: JSON.stringify({ event, session }),
  //       }).then((res) => res.json());
  //     }
  //   );

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, []);

  return (
    <>
      {!user ? (
        <Auth />
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
