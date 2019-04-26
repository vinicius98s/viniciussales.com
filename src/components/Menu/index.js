import React from "react";
import { StyledMenu, StyledItem } from "./styled";
import { Link } from "gatsby";
import PropTypes from "prop-types";

const Menu = props => {
    const arrayMenuItems = ["home", "about", "projects", "posts"];

    return (
        <StyledMenu>
            {arrayMenuItems.map(menu => (
                <Link to={menu === "home" ? "/" : `/${menu}`} key={menu}>
                    <StyledItem active={menu === props.active}>{menu}</StyledItem>
                </Link>
            ))}
        </StyledMenu>
    );
};

Menu.propTypes = {
    active: PropTypes.string.isRequired
};

export default Menu;
