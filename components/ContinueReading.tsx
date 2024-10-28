import { RefObject, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import { NextOrPreviousPost } from "@services/notion.types";

import { Text, Heading } from "@components/Typography";
import { Row, Col, Flex } from "@components/Grid";

import Icon from "@icons/Icon";

type Props = {
  previousPost: NextOrPreviousPost | null;
  nextPost: NextOrPreviousPost | null;
};

type PrevOrNextProps = {
  preview: "previous" | "next";
  post: NextOrPreviousPost;
};

const PrevOrNext = (props: PrevOrNextProps) => {
  const ref = useRef<HTMLElement>(null) as RefObject<HTMLElement>;
  const isInView = useInView(ref, { once: true });

  const translateX = props.preview === "previous" ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      transition={{ duration: 0.5 }}
      initial={{ translateX, opacity: 0 }}
      animate={{
        translateX: isInView ? 0 : translateX,
        opacity: isInView ? 1 : 0,
      }}
    >
      <Flex
        alignItems={props.preview === "previous" ? "flex-start" : "flex-end"}
        flexDirection="column"
      >
        <Link href={`/blog/${props.post.slug}`}>
          <Flex
            alignItems="center"
            justifyContent={
              props.preview === "previous" ? "flex-start" : "flex-end"
            }
          >
            {props.preview === "previous" && (
              <Icon color="gray" name="chevron-left" width={20} height={20} />
            )}
            <Text
              color="gray"
              fontWeight="600"
              ml={props.preview === "previous" ? 2 : 0}
              mr={props.preview === "next" ? 2 : 0}
            >
              {props.preview === "previous" ? "Previous Post" : "Next Post"}
            </Text>
            {props.preview === "next" && (
              <Icon color="gray" name="chevron-right" width={20} height={20} />
            )}
          </Flex>
          <Heading
            color="primary"
            level={3}
            fontWeight={700}
            fontSize="20px"
            mt={1}
          >
            {props.post.title}
          </Heading>
        </Link>
      </Flex>
    </motion.div>
  );
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
            <PrevOrNext preview="previous" post={props.previousPost} />
          )}
        </Col>
        <Col size={2}>
          {props.nextPost && (
            <PrevOrNext preview="next" post={props.nextPost} />
          )}
        </Col>
      </Row>
    </>
  );
}
