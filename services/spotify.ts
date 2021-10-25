import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import axios from "axios";

export type Song = {
  id: string;
  name: string;
  artists: { name: string }[];
  external_urls: {
    spotify: string;
  };
  album: {
    images: { height: number; width: number; url: string }[];
  };
};

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export function getTopSongs() {
  return pipe(
    O.fromNullable(process.env.SPOTIFY_AUTH_TOKEN),
    TE.fromOption(() => new Error("Missing SPOTIFY_AUTH_TOKEN")),
    TE.chain((token) =>
      TE.tryCatch(async () => {
        const url = `${SPOTIFY_BASE_URL}/me/top/tracks?time_range=short_term&limit=2`;
        const response = await axios.get<{ items: Song[] }>(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.items;
      }, E.toError)
    )
  );
}
