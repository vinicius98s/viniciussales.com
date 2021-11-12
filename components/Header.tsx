import Menu, { Pages } from "./Menu";
import { Row } from "./Grid";

type Props = {
  activePage?: Pages;
};

const Header: React.FC<Props> = ({ activePage }) => {
  return (
    <Row as="header" mt={7}>
      <Menu activePage={activePage} />
    </Row>
  );
};

export default Header;
