import {
  DatabaseObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type NextOrPreviousPost = {
  title: string;
  description: string;
  slug: string;
};

export type FormattedPost = Post & {
  content: ListBlockChildrenResponse;
  title: string;
  description: string;
  previousPost: NextOrPreviousPost | null;
  nextPost: NextOrPreviousPost | null;
};

export type Page =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse;

export type Post = {
  id: string;
  title: string;
  createdAt: string;
  description: string;
  slug: string;
  likes: number;
  isDraft: boolean;
  image: string | null;
};
