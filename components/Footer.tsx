import styled from "styled-components";
import Link from "next/link";

import { Row, Box, Col } from "@components/Grid";

const Wrapper = styled.footer`
  margin-bottom: ${(p) => p.theme.space[8]}px;

  li:not(:first-of-type) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Box bg="darkGrey" width="100%" height="1px" my={5} />
      <Row>
        <Col size={1}>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/writing">
                <a>Writings</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col size={1}>
          <ul>
            <li>Github</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </Col>
      </Row>
    </Wrapper>
  );
}
