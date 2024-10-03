import type { NextApiRequest, NextApiResponse } from "next";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { flow, pipe } from "fp-ts/function";

import { fetchAndSaveTopSongs } from "@services/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await pipe(
    O.fromNullable(req.query["time_range"] as string | undefined),
    O.getOrElse(() => "short_term"),
    (timeRange) =>
      pipe(
        O.fromNullable(req.query["code"] as string | undefined),
        O.match(
          () => T.of(res.status(500).send("Missing code query param")),
          flow(
            fetchAndSaveTopSongs(timeRange),
            TE.match(
              (e) => res.status(500).send(e.message),
              (songs) => {
                res.setHeader("Content-Type", "text/html; charset=UTF-8");
                return res.status(200).send(`
<style>body { background: #0C0C0C; color: #FAFAFA }</style>
Updated Spotify songs:<br/>
${songs.map((song) => song.name).join("<br/>")}<br/><br/>
<a href="/">Back to home</a>
`);
              }
            )
          )
        )
      )
  )();
}
