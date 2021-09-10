import React from "react";
import { supabase } from "../lib/initSupabase";
import Dropzone from "../components/Dropzone";
import ImageList from "../components/ImageList";

export default function IndexPage() {
  const user = supabase.auth.user();

  console.log("user", user);

  return (
    <div className="w-full h-full bg-gray-300">
      {!user ? (
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
          {/* <Auth
            supabaseClient={supabase}
            providers={["google", "github"]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          /> */}
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          WEE
          <Dropzone />
          <ImageList />
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
    </div>
  );
}
