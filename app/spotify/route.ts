import { NextResponse, type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import { flow, pipe } from "fp-ts/function";
import qs from "query-string";

import { fetchAndSaveTopSongs } from "@services/spotify";

export async function GET(req: NextRequest) {
  return await pipe(
    O.fromNullable(req.nextUrl.searchParams.get("code")),
    O.match(
      () => {
        const params = qs.stringify({
          scope: "user-top-read,user-read-private,user-read-email",
          response_type: "code",
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
          redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
        });

        redirect(`https://accounts.spotify.com/authorize?${params}`);
      },
      flow(
        fetchAndSaveTopSongs,
        TE.match(
          (e) => new NextResponse(e.message),
          (songs) =>
            new NextResponse(
              `Updated Spotify songs: ${songs.map((song) => song.name).join(" & ")}`
            )
        )
      )
    )
  )();
}
