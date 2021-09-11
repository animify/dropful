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
          .eq("shortid", "animify")
          .single();
      });
    },
    [team]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex p-4 border-2 w-full" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
