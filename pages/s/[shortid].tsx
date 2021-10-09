import React from "react";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { TeamProvider } from "../../contexts/team";
import Dropzone from "../../components/Dropzone";
import Nav from "../../components/Nav";
import Grid from "../../components/Grid";

interface Params extends ParsedUrlQuery {
  shortid: string;
}

export default function TeamPage() {
  const router = useRouter();
  const params = router.query as Params;
  const shortid = params.shortid;

  return (
    <TeamProvider shortid={shortid}>
      <Nav />
      <Dropzone />
      <Grid />
    </TeamProvider>
  );
}
