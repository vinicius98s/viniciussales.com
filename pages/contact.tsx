import type { NextPage } from "next";
import styled from "styled-components";

import Header from "@components/Header";
import { Col, Flex, Row } from "@components/Grid";
import { Heading, Text } from "@components/Typography";
import Seo from "@components/Seo";

import Icon from "@icons/Icon";

const IconsWrapper = styled(Flex)`
  > * {
    margin-right: 16px;
  }
`;

const Contact: NextPage = () => {
  return (
    <>
      <Seo title="Contact" />
      <Header activePage="contact" />
      <Row mt={7} as="section">
        <Col size={3}>
          <Heading color="primary" fontSize="32px">
            <span role="img" aria-label="mail box">
              📫
            </span>{" "}
            Get in contact.
          </Heading>
          <Heading level={2} mt={2} fontSize="24px">
            Feel free to reach me out.
          </Heading>
          <Text mt={3} fontSize="16px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Col>
      </Row>
      <IconsWrapper mt={4}>
        <Icon name="github" color="white" width={24} height={24} />
        <Icon name="linkedin" color="white" width={24} height={24} />
        <Icon name="twitter" color="white" width={24} height={24} />
        <Icon name="email" color="white" width={24} height={24} />
      </IconsWrapper>
    </>
  );
};

export default Contact;
