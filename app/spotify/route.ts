import { NextResponse, type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import * as O from "fp-ts/Option";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import { flow, pipe } from "fp-ts/function";
import qs from "query-string";

import { fetchAndSaveTopSongs } from "@services/spotify";

export async function GET(req: NextRequest) {
  return await pipe(
    O.fromNullable(req.nextUrl.searchParams.get("time_range")),
    O.match(
      () => E.right(O.none),
      (timeRange) => {
        if (
          timeRange === "short_term" ||
          timeRange === "medium_term" ||
          timeRange === "long_term"
        ) {
          return E.right(O.some(timeRange));
        }

        return E.left(
          "time_range must be either 'short_term', 'medium_term' or 'long_term'. Defaults to 'short_term'."
        );
      }
    ),
    E.matchW(
      (message) => new NextResponse(message),
      flow(
        O.getOrElse(() => "short_term"),
        (timeRange) =>
          pipe(
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
                fetchAndSaveTopSongs(timeRange),
                TE.match(
                  (e) => new NextResponse(e.message),
                  (songs) => {
                    const response = new NextResponse(
                      `Updated Spotify songs:<br><br>${songs.map((song) => song.name).join("<br>")}<br><a href="/">Go home</a>`
                    );
                    response.headers.set(
                      "Content-Type",
                      "text/html; charset=utf-8"
                    );
                    return response;
                  }
                )
              )
            )
          )()
      )
    )
  );
}
