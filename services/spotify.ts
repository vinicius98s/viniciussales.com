import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { sequenceT } from "fp-ts/lib/Apply";
import axios, { AxiosResponse } from "axios";
import qs from "query-string";
import Client from "ioredis";

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

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SPOTIFY_ACCOUNTS_BASE_URL = "https://accounts.spotify.com";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const REDIS_URI = process.env.REDIS_URI;
const REDIS_KEY = "top-tracks";

const sequenceTOption = sequenceT(O.Apply);
function buildApiOptions(code: string) {
  return pipe(
    sequenceTOption(O.fromNullable(CLIENT_ID), O.fromNullable(CLIENT_SECRET)),
    E.fromOption(
      () =>
        new Error(
          "Missing NEXT_PUBLIC_SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET"
        )
    ),
    E.map(([clientId, clientSecret]) => ({
      url: `${SPOTIFY_ACCOUNTS_BASE_URL}/api/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      data: qs.stringify({
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    }))
  );
}

function getAccessToken(code: string) {
  return pipe(
    buildApiOptions(code),
    TE.fromEither,
    TE.chain(({ url, headers, data }) =>
      TE.tryCatch(async () => {
        const response: AxiosResponse<{ access_token: string }> =
          await axios.post(url, data, { headers });
        return response.data.access_token;
      }, E.toError)
    )
  );
}

let redis: Client;
function getRedisClient() {
  return pipe(
    O.fromNullable(REDIS_URI),
    O.map((uri) =>
      pipe(
        O.fromNullable(redis),
        O.fold(
          () => new Client(uri),
          (redis) => redis
        )
      )
    )
  );
}

export function getTopSongs(code: string | null) {
  return pipe(
    getRedisClient(),
    TE.fromOption(() => new Error("Failed to get redis client")),
    TE.chain((client) =>
      pipe(
        O.fromNullable(code),
        O.fold(
          () =>
            TE.tryCatch(async () => {
              const response = (await client.get(REDIS_KEY)) ?? "[]";
              return JSON.parse(response) as Song[];
            }, E.toError),
          (code) =>
            pipe(
              getAccessToken(code),
              TE.chain((token) =>
                pipe(
                  TE.tryCatch(async () => {
                    const url = `${SPOTIFY_API_BASE_URL}/me/top/tracks?time_range=medium_term&limit=2`;
                    const response = await axios.get<{ items: Song[] }>(url, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    return response.data.items;
                  }, E.toError),
                  TE.chain((songs) =>
                    pipe(
                      TE.tryCatch(async () => {
                        await client.set(REDIS_KEY, JSON.stringify(songs));
                        return songs;
                      }, E.toError)
                    )
                  )
                )
              )
            )
        )
      )
    )
  );
}
