import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Masonry } from "masonic";
import { useTeam } from "../contexts/team";
import { supabase } from "../lib/initSupabase";
import TeamImage from "./TeamImage";
import { atom, useAtom } from "jotai";
import {
  MinusIcon,
  PlusIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";

const countAtom = atom(3);

export default function Grid() {
  const { team } = useTeam();
  const [count, setCount] = useAtom(countAtom);
  const [imageData, setImageData] = useState<Record<string, string>>({});

  const getPhotoUrls = useCallback(async () => {
    const imageMap: typeof imageData = {};
    if (!team) return imageData;

    const promises = team.images.map(async (image) => {
      const file = await supabase.storage
        .from("imagedata")
        .createSignedUrl(`${team.shortid}/${image.filename}`, 86400);
      imageMap[image.id] = file.signedURL;
    });

    await Promise.all(promises);
    return imageMap;
  }, [team, imageData]);

  const images = useMemo(() => {
    if (!team?.images) return [];

    return team.images.map((image) => ({
      ...image,
      src: imageData[image.id.toString()],
    }));
  }, [imageData]);

  useEffect(() => {
    if (!team) return;
    getPhotoUrls().then(setImageData);
  }, [team]);

  return (
    <>
      <div className="flex items-center justify-between border-b px-3 border-black/[8%] bg-white mb-5">
        <div className="flex space-x-0.5 relative">
          <button className="relative text-sm flex font-medium py-3 px-3 text-gray-800">
            All
            <div className="w-full h-0.5 absolute -bottom-px left-0 bg-gray-800"></div>
          </button>
          <button className="relative text-sm flex font-medium py-3 px-3 text-gray-500">
            Screenshots
          </button>
          <button className="relative text-sm flex font-medium py-3 px-3 text-gray-500">
            Mobile
          </button>
        </div>

        <div className="flex space-x-2">
          <div className="flex rounded-full px-2.5 py-1.5 bg-gray-200">
            <SortAscendingIcon className="text-gray-800 w-5 h-5" />
          </div>
          {/* <div className="flex rounded-lg">
            <SortDescendingIcon className="text-gray-800 w-5 h-5" />
          </div> */}
        </div>
      </div>
      <div className="flex flex-col w-full mx-auto px-5">
        <Masonry
          columnCount={count}
          columnGutter={20}
          items={images}
          itemKey={getItemKey}
          render={TeamImage}
        />
      </div>

      <div className="flex items-center fixed bottom-3 right-3 rounded-full px-3 py-2 bg-gray-900 shadow-lg z-50">
        <button
          className="p-2 cursor-pointer"
          onClick={() => setCount((count) => count - 1)}
        >
          <MinusIcon className="text-gray-200 w-4 h-4" />
        </button>
        <p className="w-10 font-medium text-center text-gray-50">{count}</p>
        <button
          className="p-2 cursor-pointer"
          onClick={() => setCount((count) => count + 1)}
        >
          <PlusIcon className="text-gray-200 w-4 h-4" />
        </button>
      </div>
    </>
  );
}

function getItemKey({ id }: { id: number }) {
  return id;
}
