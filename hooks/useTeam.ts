// import { useRouter } from "next/router";
// import { ParsedUrlQuery } from "querystring";
// import { atom, useAtom } from "jotai";
// import { atomFamily, useAtomValue, useUpdateAtom } from "jotai/utils";
// import { ITeam } from "../types/team";
// import useSwr from "swr";
// import fetcher from "../lib/fetcher";

// interface Params extends ParsedUrlQuery {
//   shortid: string;
// }

// export const currentDateAtom = atom<ITeam | null>(null);

// export default function useTeam() {
//   const d = useAtomValue(currentDateAtom);
//   const setUser = useUpdateAtom(currentDateAtom);
//   const { query } = useRouter();
//   const params = query as Params;
//   const shortid = params.shortid;

//   const { data: team } = useSwr(`/api/teams/${shortid}`, async (data) => {
//     const newData = await fetcher(data);
//     setTeamAtom(newData);
//   });
// }
