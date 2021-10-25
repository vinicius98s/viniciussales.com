import Link from "next/link";
import styled from "styled-components";

import { Row, Col, Box, Flex } from "@components/Grid";
import { Heading, Text } from "@components/Typography";

import { Post } from "@services/notion";
import Icon from "@icons/Icon";
import useLocalStorage from "@hooks/useLocalStorage";

type Props = {
  posts: Post[];
};

const PostWrapper = styled(Flex)`
  cursor: pointer;

  :hover {
    h3 {
      color: ${(p) => p.theme.colors.primary};
      transition: 0.3s ease;
    }
  }
`;

function PostPreview(post: Post) {
  const [isLiked, setIsLiked] = useLocalStorage(post.id, false);

  return (
    <Col size={2} key={post.id}>
      <PostWrapper justifyContent="space-between" alignItems="center">
        <Link href={`/${post.slug}`} passHref>
          <Heading level={3} fontSize="20px" as="a">
            {post.title}
          </Heading>
        </Link>
        <Icon
          name={isLiked ? "heart" : "heart-outline"}
          width={18}
          height={18}
          onClick={() => setIsLiked((prevLiked) => !prevLiked)}
        />
      </PostWrapper>
      <Text fontSize="14px" color="gray">
        {post.createdAt}
      </Text>
      <Text mt={2}>{post.description}</Text>
    </Col>
  );
}

const LastWritings: React.FC<Props> = ({ posts }) => {
  return (
    <Box as="section" my={7}>
      <Heading level={2} mb={3}>
        Last Writings.
      </Heading>
      <Row>
        {posts.map((post) => (
          <PostPreview key={post.id} {...post} />
        ))}
      </Row>
    </Box>
  );
};

export default LastWritings;
