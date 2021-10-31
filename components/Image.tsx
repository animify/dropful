import { useState, useCallback } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

interface Props {
  loader: string;
  name: string;
  createdAt: string;
  src?: string;
  width: number;
  height: number;
  alt: string;
}

export default function Image({
  name,
  createdAt,
  loader,
  src,
  width,
  height,
  alt,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const ratio = height / width;
  const displayHeight = 240;
  const displayWidth = displayHeight / ratio;

  return (
    <div className="flex group relative">
      <div className="absolute h-full w-full top-0 left-0 px-3.5 py-3 z-30 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="flex flex-col">
          <small className="font-medium text-white">{name}</small>
          <small className="opacity-40">
            {dayjs(createdAt).format("MMM D, HH:mm")}
          </small>
        </div>
      </div>
      <div className="flex relative overflow-hidden">
        <img
          src={loader}
          alt={alt}
          style={{
            filter: "blur(15px)",
            height: displayHeight,
            width: displayWidth,
          }}
        />
        {src && (
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
            src={src}
            alt={alt}
            onLoad={onLoad}
          />
        )}
      </div>
    </div>
  );
}
