import styled from "styled-components";

const StyledMenu = styled.ul`
    width: 10vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--darkGrey);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StyledItem = styled.li`
    list-style: none;
    text-align: center;
    transform: rotate(270deg);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    height: 10vw;
    padding-top: ${props => (props.active ? "7px" : "0")};
    transition: 0.3s ease-in-out;
    font-size: 18px;

    &:before {
        content: "";
        background: var(--pink);
        width: 60%;
        height: 7px;
        position: absolute;
        transition: 0.3s ease-in-out;
        top: 0;
        margin-top: ${props => (props.active ? "0" : "-7px")};
        z-index: -1;
    }

    &:hover {
        padding-top: 7px;

        &:before {
            margin-top: 0;
        }
    }
`;

export { StyledMenu, StyledItem };
