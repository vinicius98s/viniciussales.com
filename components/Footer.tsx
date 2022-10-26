import styled from "@emotion/styled";
import Link from "next/link";

import { Row, Box, Col } from "@components/Grid";

const Wrapper = styled.footer`
  margin-bottom: ${(p) => p.theme.space[8]}px;

  li:not(:first-of-type) {
    margin-top: ${(p) => p.theme.space[2]}px;
  }

  a:hover {
    color: ${(p) => p.theme.colors.primary};
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Box bg="darkGrey" width="100%" height="1px" my={5} />
      <Row px={[4, 0]}>
        <Col size={1}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/writing">Writings</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </Col>
        <Col size={1}>
          <ul>
            <li>
              <a
                href="https://github.com/vinicius98s"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/vinicius-sales"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Wrapper>
  );
}
