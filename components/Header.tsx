import Menu, { Pages } from "./Menu";
import { Row } from "./Grid";

type Props = {
  activePage: Pages;
};

const Header: React.FC<Props> = ({ activePage }) => {
  return (
    <Row as="header" my={7} gridTemplateColumns={["auto", "repeat(4, 1fr)"]}>
      <Menu activePage={activePage} />
    </Row>
  );
};

export default Header;
