import React, { useContext, useEffect } from "react";
import useSwr, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import { supabase } from "../lib/initSupabase";
import { ITeam } from "../types/team";

interface TeamProviderProps {
  children: React.ReactNode;
  shortid: string;
}

export interface TeamContextProps {
  team: ITeam | undefined;
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
