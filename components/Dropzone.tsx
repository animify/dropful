import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import fetcher from "../lib/fetcher";
import { supabase } from "../lib/initSupabase";

export default function Dropzone() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);

    acceptedFiles.forEach((file) => {
      console.log("file", file);

      const fileReader = new FileReader();

      fileReader.onload = () => {
        // file is loaded
        const img = new Image();

        img.onload = async () => {
          console.log("height", img.height);
          console.log("width", img.width);

          const path = `animify/${file.name}`;

          await supabase.storage.from("imagedata").upload(path, file, {
            cacheControl: "3600",
            upsert: false,
          });

          const { signedURL } = await supabase.storage
            .from("imagedata")
            .createSignedUrl(path, 60);

          const { base64 } = await fetcher(
            `/api/getImageHash?imageUrl=${signedURL}`
          );

          console.log("{base64}", { base64 });

          const { data, error } = await supabase
            .from("images")
            .insert({
              name: file.name.split(".")[0],
              filename: file.name,
              width: img.width,
              height: img.height,
              base64,
            })
            .single();

          const { data: newData, error: newError } = await supabase
            .from("teams")
            .update({
              images: [data.id],
            })
            .eq("shortid", "animify")
            .single();

          // console.log("d", d);
        };

        img.src = fileReader.result as string;
      };

      fileReader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
