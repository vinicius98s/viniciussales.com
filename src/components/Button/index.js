import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background: var(--pink);
    color: white;
    border: none;
    padding: 5px 20px;
    border-radius: 13px;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 0 1px 20px rgba(222, 74, 94, 0.3);
    outline: none;
    transition: 0.3s ease-in-out;

    :hover {
        background: #a52f3f;
    }
`;

const Button = props => {
    return <StyledButton>{props.title}</StyledButton>;
};

export default Button;
