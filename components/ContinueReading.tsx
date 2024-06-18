import Link from "next/link";

import { NextOrPreviousPost } from "@services/notion.types";

import { Text, Heading } from "@components/Typography";
import { Row, Col, Flex } from "@components/Grid";

import Icon from "@icons/Icon";

type Props = {
  previousPost: NextOrPreviousPost | null;
  nextPost: NextOrPreviousPost | null;
};

export default function ContinueReading(props: Props) {
  if (!props.nextPost && !props.previousPost) {
    return null;
  }

  return (
    <>
      <Text fontSize="20px" fontWeight="bold" mb={4} mt={8}>
        Continue reading
      </Text>
      <Row>
        <Col size={2}>
          {props.previousPost && (
            <Flex flexDirection="column">
              <Link href={`/blog/${props.previousPost.slug}`}>
                <Flex alignItems="center" justifyContent="flex-start">
                  <Icon
                    color="gray"
                    name="chevron-left"
                    width={20}
                    height={20}
                  />
                  <Text color="gray" fontWeight="600" ml={2}>
                    Previous Post
                  </Text>
                </Flex>
                <Heading
                  color="primary"
                  level={3}
                  fontWeight={700}
                  fontSize="20px"
                  mt={1}
                >
                  {props.previousPost.title}
                </Heading>
              </Link>
            </Flex>
          )}
        </Col>
        <Col size={2}>
          {props.nextPost && (
            <Flex flexDirection="column" alignItems="flex-end">
              <Link href={`/blog/${props.nextPost.slug}`}>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Text color="gray" fontWeight="600" mr={2}>
                    Next Post
                  </Text>
                  <Icon
                    color="gray"
                    name="chevron-right"
                    width={20}
                    height={20}
                  />
                </Flex>
                <Heading
                  color="primary"
                  level={3}
                  fontWeight={700}
                  fontSize="20px"
                  mt={1}
                >
                  {props.nextPost.title}
                </Heading>
              </Link>
            </Flex>
          )}
        </Col>
      </Row>
    </>
  );
}
