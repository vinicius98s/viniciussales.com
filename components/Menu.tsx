import Link from "next/link";
import styled from "@emotion/styled";

export type Pages = "home" | "writing" | "contact";
type Props = {
  activePage: Pages;
};

const Container = styled.nav`
  display: flex;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${(p) => p.theme.space[4]}px;

  a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.white};
    position: relative;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ActiveBullet = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: ${(p) => p.theme.colors.primary};
  margin-top: ${(p) => p.theme.space[1]}px;
`;

const Menu: React.FC<Props> = ({ activePage }) => {
  return (
    <Container>
      <MenuItem>
        <Link href="/">Home</Link>
        {activePage === "home" && <ActiveBullet />}
      </MenuItem>

      <MenuItem>
        <Link href="/writing">Writing</Link>
        {activePage === "writing" && <ActiveBullet />}
      </MenuItem>

      <MenuItem>
        <Link href="/contact">Contact</Link>
        {activePage === "contact" && <ActiveBullet />}
      </MenuItem>
    </Container>
  );
};

export default Menu;
