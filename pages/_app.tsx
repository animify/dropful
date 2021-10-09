import "../styles/index.css";
import "../styles/fonts.css";
import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
