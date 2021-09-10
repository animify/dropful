import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { TeamProvider } from "../../contexts/team";
import ImageList from "../../components/ImageList";
import Dropzone from "../../components/Dropzone";

interface Params extends ParsedUrlQuery {
  shortid: string;
}

export default function TeamPage() {
  const router = useRouter();
  const params = router.query as Params;
  const shortid = params.shortid;

  return (
    <TeamProvider shortid={shortid}>
      <div className="w-full h-full bg-gray-300">
        {shortid}
        <Dropzone />
        <ImageList />
      </div>
    </TeamProvider>
  );
}