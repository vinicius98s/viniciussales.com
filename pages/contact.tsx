import type { NextPage } from "next";
import styled from "@emotion/styled";

import Header from "@components/Header";
import { Col, Flex, Row } from "@components/Grid";
import { Heading, Text } from "@components/Typography";
import Seo from "@components/Seo";

import type { IconNames } from "@icons/Icon";
import Icon from "@icons/Icon";

const IconsWrapper = styled(Flex)`
  > * {
    margin-right: 16px;
  }
`;

const IconLink = (props: { name: IconNames; href: string }) => {
  return (
    <a target="_blank" rel="noreferrer" href={props.href}>
      <Icon name={props.name} color="white" width={24} height={24} />
    </a>
  );
};

const Contact: NextPage = () => {
  return (
    <>
      <Seo title="Contact" />
      <Header activePage="contact" />
      <Row as="section" gridTemplateColumns={["auto", "repeat(4, 1fr)"]}>
        <Col size={3}>
          <Flex alignItems="center">
            <span role="img" aria-label="mail box" style={{ fontSize: 32 }}>
              📫
            </span>
            <Heading color="primary" fontSize={5} ml={2}>
              Get in contact.
            </Heading>
          </Flex>
          <Heading level={2} mt={2} fontSize={4}>
            Feel free to reach me out.
          </Heading>
          <Text mt={3} fontSize="16px" lineHeight={1.4}>
            Feel free to reach out to me for any inquiries, collaboration
            opportunities, or just to connect. I'm always open to discussing new
            projects, sharing insights, or exploring potential partnerships.
          </Text>
        </Col>
      </Row>

      <IconsWrapper mt={4} px={[4, 0]}>
        <IconLink name="github" href="https://github.com/vinicius98s" />
        <IconLink
          name="linkedin"
          href="https://linkedin.com/in/vinicius-sales"
        />
        <IconLink name="email" href="mailto:vinicius.2010.s@gmail.com" />
      </IconsWrapper>
    </>
  );
};

export default Contact;
