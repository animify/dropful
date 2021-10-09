import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Masonry } from "masonic";
import { useTeam } from "../contexts/team";
import { supabase } from "../lib/initSupabase";
import TeamImage from "./TeamImage";

export default function Grid() {
  const { team } = useTeam();
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
    <div className="flex flex-col w-full mx-auto px-5">
      <Masonry
        columnCount={3}
        columnGutter={8}
        items={images}
        render={TeamImage}
      />
    </div>
  );
}
