import { useRef } from "react";

import { Heading, Text } from "@components/Typography";
import { Col, Flex, Row } from "@components/Grid";
import Popover from "@components/Popover";

function Greetings() {
  const audioRef = useRef<HTMLMediaElement>(null);

  return (
    <Row as="section" gridTemplateColumns={["auto", "repeat(4, 1fr)"]}>
      <Col size={3}>
        <Flex alignItems="center">
          <span role="img" aria-label="waving hand" style={{ fontSize: 32 }}>
            👋
          </span>
          <Heading color="primary" fontSize={5} ml={2}>
            Hi, I'm Vinícius Sales.
          </Heading>
        </Flex>

        <Flex alignItems="center" mb={3} mt={2}>
          <Popover content="Not sure how to pronounce? Check it out.">
            <Heading
              color="gray"
              level={2}
              role="button"
              onClick={() => audioRef.current?.play()}
              style={{ cursor: "pointer" }}
            >
              /viˈnisiəs ˈsælɪs/
            </Heading>
            <audio
              ref={audioRef}
              preload="auto"
              aria-label="Pronunciation of my name"
            >
              <source src="name.mp3" />
              <p>Your browser doesn't support HTML audio. </p>
            </audio>
          </Popover>
        </Flex>

        <Heading level={2} mt={2} fontSize={4}>
          Software Development Engineer
        </Heading>
        <Text mt={3} fontSize="16px" lineHeight={1.4}>
          A seasoned full-stack developer with a strong background in both
          front-end and back-end technologies. Proficient in React, Node.js,
          Typescript, and Functional Programming. I have a proven track record
          of developing, maintaining, and enhancing web applications, excel in
          modernizing codebases, implementing new features, and ensuring high
          code quality standards. My expertise is backed by a proactive approach
          to continuous learning and professional growth.
        </Text>
      </Col>
    </Row>
  );
}

export default Greetings;
