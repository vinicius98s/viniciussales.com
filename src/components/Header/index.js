import React from "react";

import Follow from "../Follow";

import { StyledHeader, Title, Description } from "./styled";

const Header = props => (
    <StyledHeader>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        <Follow header />
    </StyledHeader>
);

export default Header;
