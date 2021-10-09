import React, { useMemo, useState } from "react";
import { supabase } from "../lib/initSupabase";
import { useCallback } from "react";
import { useEffect } from "react";
import { useTeam } from "../contexts/team";
import { AnimatePresence, motion } from "framer-motion";
import Image from "./Image";

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

  console.log("team?.images", team?.images);
  return (
    <div className="flex flex-col w-full mx-auto px-4">
      <motion.div className="flex gap-1.5 flex-wrap">
        <AnimatePresence>
          {team?.images.map((data) => (
            <motion.div
              layout
              key={data.id}
              className="flex rounded overflow-hidden"
            >
              <Image
                key={data.id}
                name={data.name || data.filename}
                createdAt={data.created_at}
                src={imageData[data.id.toString()]}
                loader={data.base64}
                alt={data.name}
                height={data.height}
                width={data.width}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
