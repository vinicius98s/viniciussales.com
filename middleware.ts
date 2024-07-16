import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import qs from "query-string";

export function middleware(request: NextRequest) {
  return pipe(
    O.fromNullable(request.nextUrl.searchParams.get("time_range")),
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
    E.match(
      (message) => NextResponse.json({ message }, { status: 400 }),
      () =>
        pipe(
          O.fromNullable(request.nextUrl.searchParams.get("code")),
          O.match(
            () => {
              const params = qs.stringify({
                scope: "user-top-read,user-read-private,user-read-email",
                response_type: "code",
                client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
                redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
              });

              return NextResponse.redirect(
                `https://accounts.spotify.com/authorize?${params}`
              );
            },
            () => NextResponse.next()
          )
        )
    )
  );
}

export const config = {
  matcher: "/api/spotify",
};
