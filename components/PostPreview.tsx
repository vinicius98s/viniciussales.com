import Link from "next/link";
import axios from "axios";
import styled from "@emotion/styled";
import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/function";
import { motion } from "framer-motion";

import { Box, Flex } from "@components/Grid";
import { Text } from "@components/Typography";
import Badge from "@components/Badge";

import { Post } from "@services/notion.types";
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

const PostPreview: React.FC<{ post: Post; index: number }> = ({
  post,
  index,
}) => {
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.45, delay: index * 0.2 }}
    >
      {post.isDraft && (
        <Box mb={1}>
          <Badge>DRAFT</Badge>
        </Box>
      )}
      <PostWrapper justifyContent="space-between" alignItems="center">
        <Link href={`/blog/${post.slug}`}>
          <Text fontWeight={700} fontSize="20px">
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
    </motion.div>
  );
};

export default PostPreview;
