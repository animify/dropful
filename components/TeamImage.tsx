import { useState, useCallback } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { ITeamImageWithSrc } from "../types/team";
import type { RenderComponentProps } from "masonic";

interface Props
  extends React.PropsWithChildren<RenderComponentProps<ITeamImageWithSrc>> {}

export default function TeamImage({ data, width }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const ratio = data.height / data.width;
  const displayWidth = width;
  const displayHeight = displayWidth * ratio;

  return (
    <div className="flex group relative">
      <div className="absolute h-full w-full top-0 left-0 px-3 py-2.5 z-30 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded overflow-hidden">
        <div className="flex flex-col text-white">
          <small className="font-medium">{data.name || data.filename}</small>
          <small>{dayjs(data.created_at).format("MMM D, HH:mm")}</small>
        </div>
      </div>
      <div className="flex relative rounded overflow-hidden">
        <img
          src={data.base64}
          alt={data.filename}
          style={{
            filter: "blur(15px)",
            height: displayHeight,
            width: displayWidth,
          }}
        />
        {data.src && (
          <img
            className={classNames(
              "transition-all duration-200 ease-in absolute z-0 left-0 top-0",
              {
                "opacity-0 scale-110": !isLoaded,
                "opacity-100 scale-100 group-hover:scale-105": isLoaded,
              }
            )}
            style={{
              willChange: "opacity, transform",
              objectFit: "cover",
              objectPosition: "center",
              height: displayHeight,
              width: displayWidth,
            }}
            src={data.src}
            onLoad={onLoad}
          />
        )}
      </div>
    </div>
  );
}
