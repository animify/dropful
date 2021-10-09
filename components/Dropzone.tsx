import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTeam } from "../contexts/team";
import fetcher from "../lib/fetcher";
import { supabase } from "../lib/initSupabase";

export default function Dropzone() {
  const { team } = useTeam();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!team) return;
      console.log("acceptedFiles", acceptedFiles);

      acceptedFiles.forEach(async (file) => {
        console.log("file", file);

        const path = `${team.shortid}/${file.name}`;

        await supabase.storage.from("imagedata").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

        const { signedURL } = await supabase.storage
          .from("imagedata")
          .createSignedUrl(path, 60);

        const { base64, width, height } = await fetcher(
          `/api/getImageHash?imageUrl=${signedURL}`
        );

        const { data, error } = await supabase
          .from("images")
          .insert({
            name: file.name.split(".")[0],
            filename: file.name,
            width,
            height,
            base64,
          })
          .single();

        const { data: newData, error: newError } = await supabase
          .from("teams")
          .update({
            images: [
              ...new Set([...team.images.map((img) => img.id), data.id]),
            ],
          })
          .eq("shortid", team.shortid)
          .single();
      });
    },
    [team]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full h-full p-12 z-50 pointer-events-none"
      )}
      {...getRootProps()}
    >
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center w-full h-full"
          >
            <div
              className="fixed top-0 left-0 grid grid-rows-3 grid-cols-3 w-full h-full"
              style={{ filter: `blur(200px)` }}
            >
              <span className="w-full h-full bg-blue-500"></span>
              <span className="w-full h-full bg-green-500"></span>
              <span className="w-full h-full bg-purple-500"></span>
              <span className="w-full h-full bg-yellow-500"></span>
              <span className="w-full h-full bg-red-500"></span>
              <span className="w-full h-full bg-indigo-500"></span>
              <span className="w-full h-full bg-red-500"></span>
              <span className="w-full h-full bg-green-500"></span>
              <span className="w-full h-full bg-yellow-500"></span>
            </div>

            <div className="flex items-center justify-center w-full h-full bg-white rounded-3xl relative z-40 shadow-2xl">
              <input {...getInputProps()} />
              <h3 className="font-medium tracking-tight">
                {isDragActive
                  ? "Go on, drop them!"
                  : "Drag in some images, or click here to select some"}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
