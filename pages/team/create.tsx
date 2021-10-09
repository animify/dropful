import { useState } from "react";
import { supabase } from "../../lib/initSupabase";

export default function CreateTeam() {
  const [name, setName] = useState<string | null>(null);
  const [shortid, setShortid] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      const user = supabase.auth.user();
      const data = await supabase
        .from("teams")
        .insert({ name, shortid, members: [user.id], images: [] });

      console.log("name", name);
      console.log("shortid", shortid);
      console.log("data", data);
    } catch (error) {
      alert(error.error_description || error.message);
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
          <input
            placeholder="name"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            placeholder="shortid"
            type="text"
            onChange={(event) => setShortid(event.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleCreate();
            }}
            className="button block"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
