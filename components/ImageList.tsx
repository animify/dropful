import React, { useMemo, useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/initSupabase";
import { useCallback } from "react";
import { useEffect } from "react";
import { useTeam } from "../contexts/team";
import { AnimatePresence, motion } from "framer-motion";
import ImageItem from "./ImageItem";

function getLayoutGroups(
  images: {
    id: number;
    width: number;
    height: number;
    name: string;
    filename: string;
    base64: string;
  }[]
) {
  const columnsTotal = 3;
  const groups = Array(columnsTotal)
    .fill(null)
    .map((_) => []);
  console.log("groups", groups);

  let index = 0;
  let loopedTotal = 0;

  for (const image of images) {
    if (index >= columnsTotal) {
      index = 0;
    }

    groups[index].push(image);
    console.log("index", index);
    console.log("groups", groups);

    ++index;
    ++loopedTotal;
  }

  console.log("loopedTotal", loopedTotal);
  return groups;
}

export default function ImageList() {
  const { team } = useTeam();
  const [imageData, setImageData] = useState<Record<string, string>>({});

  console.log("team", team);
  console.log("imageData", imageData);

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

  useEffect(() => {
    if (!team) return;
    getPhotoUrls().then(setImageData);
  }, [team]);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto">
      <motion.div className="flex gap-3">
        {team &&
          getLayoutGroups(team.images).map((group, index) => (
            <div key={index} className="flex flex-col gap-3 w-1/3">
              <AnimatePresence>
                {group.map((data) => (
                  <motion.div
                    layout
                    key={data.id}
                    className="rounded-lg overflow-hidden"
                  >
                    <ImageItem
                      key={data.id}
                      src={imageData[data.id.toString()]}
                      loader={data.base64}
                      alt={data.name}
                      height={data.height}
                      width={data.width}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
      </motion.div>
    </div>
  );
}
