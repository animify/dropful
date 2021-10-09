import { useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn(
        {
          provider: "github",
        },
        { redirectTo: "http://localhost:3000/profile" }
      );
      if (error) throw error;
      console.log("user", user);
      console.log("session", session);
      console.log("error", error);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
