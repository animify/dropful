import React, { useContext, useEffect } from "react";
import useSwr, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import { supabase } from "../lib/initSupabase";

interface TeamProviderProps {
  children: React.ReactNode;
  shortid: string;
}

interface Team {
  shortid: string;
  name: string;
  images: {
    id: number;
    width: number;
    height: number;
    name: string;
    filename: string;
    base64: string;
  }[];
}
export interface TeamContextProps {
  team: Team | undefined;
  loading: boolean;
}

export const TeamContext = React.createContext<TeamContextProps>({
  team: undefined,
  loading: false,
});

export const TeamProvider = ({ children, shortid }: TeamProviderProps) => {
  const { data: team } = useSwr(`/api/teams/${shortid}`, fetcher);

  useEffect(() => {
    const mySubscription = supabase
      .from("*")
      .on("*", (payload) => {
        console.log("Change received!", payload);
        mutate(`/api/teams/${shortid}`, (data) => data, true);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(mySubscription);
    };
  }, [shortid]);

  return (
    <TeamContext.Provider
      value={{
        team: team?.data,
        loading: team === undefined,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export function useTeam(): TeamContextProps {
  return useContext(TeamContext);
}
