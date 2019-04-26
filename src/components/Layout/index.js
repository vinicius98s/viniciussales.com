import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";

import "./styles.css";

import { LayoutWrapper, LayoutContent, LayoutMain } from "./styled";

const Layout = props => {
    return (
        <Fragment>
            <Menu active={props.active} />
            <LayoutWrapper>
                <LayoutContent>
                    <Header title={props.headerTitle} description={props.headerDescription} />
                    <LayoutMain>{props.children}</LayoutMain>
                    <Footer>Footer</Footer>
                </LayoutContent>
            </LayoutWrapper>
        </Fragment>
    );
};

Layout.propTypes = {
    active: PropTypes.string.isRequired,
    headerTitle: PropTypes.string,
    headerDescription: PropTypes.string
};

export default Layout;
