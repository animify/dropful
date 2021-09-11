import classNames from "classnames";
import { useState } from "react";
import { useCallback } from "react";

interface Props {
  loader: string;
  src?: string;
  width: number;
  height: number;
  alt: string;
}

export default function ImageItem({ loader, src, width, height, alt }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex relative overflow-hidden group">
      <img
        src={loader}
        alt={alt}
        height={height}
        width={width}
        style={{ filter: "blur(15px)" }}
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
          style={{ willChange: "opacity, transform" }}
          src={src}
          alt={alt}
          height={height}
          width={width}
          onLoad={onLoad}
        />
      )}
    </div>
  );
}
