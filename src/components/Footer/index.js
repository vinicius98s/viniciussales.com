import React from "react";
import { GoMarkGithub } from "react-icons/go";

import { FooterWrapper } from "./styled";
import gatsby from "./gatsby-icon.png";

const Footer = () => (
    <FooterWrapper>
        Made with
        <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
            <img src={gatsby} alt="Gatsby logo" />
        </a>
        and hosted by
        <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">
            <GoMarkGithub />
        </a>
    </FooterWrapper>
);

export default Footer;
