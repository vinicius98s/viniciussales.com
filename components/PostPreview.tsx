import Link from "next/link";
import axios from "axios";
import styled from "@emotion/styled";
import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/function";

import { Flex } from "@components/Grid";
import { Text } from "@components/Typography";

import { Post } from "@services/notion";
import Icon from "@icons/Icon";
import useLocalStorage from "@hooks/useLocalStorage";

const PostWrapper = styled(Flex)`
  cursor: pointer;

  :hover {
    a {
      color: ${(p) => p.theme.colors.primary};
      transition: 0.3s ease;
    }
  }
`;

const PostPreview: React.FC<{ post: Post }> = ({ post }) => {
  const [isLiked, setIsLiked] = useLocalStorage<O.Option<boolean>>(
    post.id,
    O.none
  );

  const handleLikeClick = async () => {
    setIsLiked(
      flow(
        O.fold(
          () => true,
          (value) => !value
        ),
        O.of
      )
    );

    if (O.isNone(isLiked)) {
      await axios.post("/api/like", { id: post.id, likes: post.likes });
    }
  };

  const liked = pipe(
    isLiked,
    O.getOrElse(() => false)
  );

  return (
    <>
      <PostWrapper justifyContent="space-between" alignItems="center">
        <Link href={`/blog/${post.slug}`} passHref>
          <Text fontWeight={700} fontSize="20px" as="a">
            {post.title}
          </Text>
        </Link>
        <Icon
          name={liked ? "heart" : "heart-outline"}
          width={18}
          height={18}
          onClick={handleLikeClick}
        />
      </PostWrapper>
      <Text fontSize="14px" color="gray">
        {post.createdAt}
      </Text>
      <Text mt={2}>{post.description}</Text>
    </>
  );
};

export default PostPreview;