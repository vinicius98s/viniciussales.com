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
              (songs) =>
                res
                  .status(200)
                  .send(
                    `Updated Spotify songs:\n\n${songs.map((song) => song.name).join("\n")}`
                  )
            )
          )
        )
      )
  )();
}
