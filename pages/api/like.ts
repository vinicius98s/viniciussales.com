import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNotionClient, likePost } from "@services/notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: string }>
) {
  const { id, likes } = req.body;
  const result = await pipe(getNotionClient(), likePost({ id, likes }))();

  res.status(E.isRight(result) ? 200 : 500).json({ id });
}
