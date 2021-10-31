import { useTeam } from "../contexts/team";
import Tabs, { TabState } from "./Tabs";
import {
  ArrowCircleUpIcon,
  ChevronDownIcon,
  SearchCircleIcon,
  SearchIcon,
} from "@heroicons/react/solid";

export default function Nav() {
  const { team } = useTeam();

  return (
    <div className="flex items-center justify-between sticky top-0 w-full h-16 bg-white z-40 border-b border-black/5 px-3">
      <div className="flex items-center space-x-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
          <span className="text-base text-yellow-500 font-bold uppercase">
            {team?.name.substr(0, 1)}
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          <p className="font-medium tracking-tight text-gray-600">Teams</p>
          <p className="font-medium tracking-tight text-gray-300">/</p>
          <div className="flex items-center space-x-0.5">
            <p className="font-medium tracking-tight">{team?.name}</p>
            <ChevronDownIcon className="text-gray-500 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        {/* <button className="flex items-center justify-center bg-gray-200 text-gray-900 font-semibold h-10 w-10 rounded-full">
          <SearchIcon className="w-5 h-5" />
        </button> */}

        <button className="flex items-center space-x-1.5 bg-indigo-500 text-white font-semibold px-4 py-2.5 h-10 rounded-full">
          <ArrowCircleUpIcon className="text-white/60 w-5 h-5 -ml-1" />
          <span className="text-sm">Upload image</span>
        </button>
      </div>
    </div>
  );
}
