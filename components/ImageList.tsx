import { useMemo, useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/initSupabase";
import { useCallback } from "react";
import { useEffect } from "react";
import { useTeam } from "../contexts/team";

export default function ImageList() {
  const { team } = useTeam();
  const [imageData, setImageData] = useState<Record<string, string>>({});

  console.log("imageData", imageData);

  const getPhotoUrls = useCallback(async () => {
    const imageMap: typeof imageData = {};
    if (!team) return {};

    console.log("team", team);

    const promises = team.images.map(async (image) => {
      const file = await supabase.storage
        .from("imagedata")
        .createSignedUrl(`public/${image.filename}`, 60);
      imageMap[image.id] = file.signedURL;
    });

    await Promise.all(promises);
    return imageMap;
  }, [team]);

  useEffect(() => {
    if (!team) return;
    getPhotoUrls().then(setImageData);
  }, [team]);

  return (
    <div className="flex flex-col">
      Photos
      <div className="flex flex-col">
        {team?.images.map((data) => (
          <div key={data.id} className="flex flex-col relative w-80 h-44">
            <Image
              src={imageData[data.id.toString()] || data.base64}
              blurDataURL={data.base64}
              alt="Picture of the author"
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
