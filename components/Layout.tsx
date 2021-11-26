import styled from "@emotion/styled";

const Container = styled.div`
  background: ${(p) => p.theme.colors.black};
  display: flex;
  justify-content: center;
  min-height: 100vh;

  main {
    max-width: 624px;
  }
`;

const TopLine = styled.div`
  background: ${(p) => p.theme.colors.primary};
  height: 5px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <TopLine />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
