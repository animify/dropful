import classNames from "classnames";
import { useCallback } from "react";
import { useState } from "react";

interface Props {
  active: TabState;
}

export enum TabState {
  "Recent" = "Recent",
  "Screenshots" = "Screenshots",
}

const tabs = Object.keys(TabState) as TabState[];

export default function Tabs({ active }: Props) {
  const [tab, setTab] = useState(TabState.Recent);
  console.log("Object.keys(enumme)", Object.keys(TabState));

  const isTabActive = useCallback((tab: TabState) => tab === active, [active]);
  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => (
        <button
          className={classNames(
            "text-base rounded-full px-4 py-2 font-medium hover:font-medium cursor-pointer",
            {
              "font-medium bg-gray-100": isTabActive(tab),
            }
          )}
          key={tab}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
