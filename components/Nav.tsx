import { useTeam } from "../contexts/team";
import Tabs, { TabState } from "./Tabs";

export default function Nav() {
  const { team } = useTeam();
  return (
    <div className="flex items-center justify-between sticky top-0 w-full h-16 bg-white z-40 px-3">
      <div className="flex space-x-2.5">
        <div className="w-6 h-6 rounded-lg bg-blue-500"></div>
        <p className="font-medium tracking-tight">{team?.name}</p>
      </div>

      <div className="flex">
        <Tabs active={TabState.Recent} />
      </div>
    </div>
  );
}
