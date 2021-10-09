import React from "react";
import { supabase } from "../lib/initSupabase";
import Dropzone from "../components/Dropzone";
import ImageList from "../components/ImageList";
import Grid from "../components/Grid";

export default function IndexPage() {
  const user = supabase.auth.user();

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
