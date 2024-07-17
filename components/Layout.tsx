import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  background: ${(p) => p.theme.colors.black};
  display: flex;
  justify-content: center;
  min-height: 100vh;

  main {
    width: 692px;
    padding: 0 ${(p) => p.theme.space[3]}px;
  }
`;

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  );
};

export default Layout;
