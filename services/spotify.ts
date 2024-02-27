import { flow, pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { sequenceT } from "fp-ts/lib/Apply";
import axios, { AxiosResponse } from "axios";
import qs from "query-string";
import Client from "ioredis";

import { Song, User } from "./spotify.types";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SPOTIFY_ACCOUNTS_BASE_URL = "https://accounts.spotify.com";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const REDIS_URI = process.env.REDIS_URI;
const REDIS_KEY = "top-tracks";

const sequenceTEither = sequenceT(E.Apply);
function buildApiOptions(code: string) {
  return pipe(
    sequenceTEither(
      pipe(
        CLIENT_ID,
        E.fromNullable(
          new Error("Missing NEXT_PUBLIC_SPOTIFY_CLIENT_ID env variable")
        )
      ),
      pipe(
        CLIENT_SECRET,
        E.fromNullable(new Error("Missing SPOTIFY_CLIENT_SECRET env variable"))
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
      TE.tryCatch(
        async () => {
          const response: AxiosResponse<{ access_token: string }> =
            await axios.post(url, data, { headers });
          return response.data.access_token;
        },
        (e) => {
          console.log("Failed to get access token", e);
          return E.toError(e);
        }
      )
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

export function fetchAndSaveTopSongs(code: string) {
  return pipe(
    getAccessToken(code),
    TE.chain((token) =>
      pipe(
        getUserData(token),
        TE.chain(flow(isAllowedUser, TE.fromEither)),
        TE.chain(() =>
          TE.tryCatch(async () => {
            const url = `${SPOTIFY_API_BASE_URL}/me/top/tracks?time_range=long_term&limit=2`;
            const response = await axios.get<{ items: Song[] }>(url, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.items;
          }, E.toError)
        ),
        TE.chain((songs) =>
          pipe(
            getRedisClient(),
            TE.fromOption(() => new Error("Failed to get redis client")),
            TE.chain((client) =>
              TE.tryCatch(async () => {
                await client.set(REDIS_KEY, JSON.stringify(songs));
                return songs;
              }, E.toError)
            )
          )
        )
      )
    )
  );
}

function getUserData(token: string): TE.TaskEither<Error, User> {
  return TE.tryCatch(async () => {
    const url = `${SPOTIFY_API_BASE_URL}/me`;
    const response = await axios.get<User>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }, E.toError);
}

function isAllowedUser(user: User) {
  return pipe(
    user,
    E.fromPredicate(
      (user) => user.id === "12144179601",
      () => new Error("Spotify user is not allowed")
    )
  );
}

export function getTopSongs(): TE.TaskEither<Error, Song[]> {
  return pipe(
    getRedisClient(),
    TE.fromOption(() => new Error("Failed to get redis client")),
    TE.chain((client) =>
      TE.tryCatch(async () => {
        const response = (await client.get(REDIS_KEY)) ?? "[]";
        return JSON.parse(response) as Song[];
      }, E.toError)
    )
  );
}
