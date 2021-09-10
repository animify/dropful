import React, { useContext } from "react";
import useSwr, { mutate } from "swr";
import fetcher from "../lib/fetcher";

interface TeamProviderProps {
  children: React.ReactNode;
  shortid: string;
}

interface Team {
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
