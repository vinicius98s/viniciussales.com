import { Row, Box, Col } from "@components/Grid";
import { Heading } from "@components/Typography";
import PostPreview from "@components/PostPreview";

import { Post } from "@services/notion";

type Props = {
  posts: Post[];
};

const LastWritings: React.FC<Props> = ({ posts }) => {
  return (
    <Box as="section" my={7} px={[4, 0]}>
      <Heading level={2} mb={3}>
        Last Writings.
      </Heading>
      <Row gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}>
        {posts.map((post) => (
          <Col size={2} key={post.id} marginBottom={[4, 0]}>
            <PostPreview post={post} />
          </Col>
        ))}
      </Row>
    </Box>
  );
};

export default LastWritings;
