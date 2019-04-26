import React from "react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

import { FollowWrapper } from "./styled";

const Follow = props => {
    return (
        <FollowWrapper header={props.header}>
            <h3>Follow me on:</h3>
            <div className="social">
                <a href="https://www.linkedin.com/in/vinicius-sales-57b8b9143/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                </a>
                <a href="https://github.com/vinicius98s" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="https://twitter.com/vinicius98s" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
            </div>
        </FollowWrapper>
    );
};

export default Follow;
