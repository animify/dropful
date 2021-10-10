import "../styles/index.css";
import "../styles/fonts.css";
import { SupabaseContextProvider } from "use-supabase";
import { supabase } from "../lib/initSupabase";

export default function MyApp({ Component, pageProps }) {
  return (
    <SupabaseContextProvider client={supabase}>
      <Component {...pageProps} />
    </SupabaseContextProvider>
  );
}
