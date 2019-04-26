import styled from "styled-components";

export const LayoutWrapper = styled.div`
    width: calc(100% - 10vw);
    margin-left: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 50px;
`;

export const LayoutContent = styled.div`
    max-width: 1250px;
    width: 100%;
    padding: 25px 0;
`;

export const LayoutMain = styled.div`
    background: linear-gradient(var(--lightGrey), var(--darkGrey));
    margin-top: 30px;
    border-radius: 20px 20px 0 0;
    padding: 25px;
`;

export const Footer = styled.div`
    width: 100%;
    height: 100px;
    background: grey;
    color: white;
    text-align: center;
`;
