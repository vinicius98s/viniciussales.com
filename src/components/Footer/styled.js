import styled from "styled-components";

export const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30px 0;
    justify-content: center;
    font-size: 12px;

    a {
        svg {
            font-size: 20px;
            margin-left: 5px;
        }
    }

    h3 {
        font-weight: 200;
    }

    img {
        width: 20px;
        height: 20px;
        margin: 0 5px;
    }

    .social {
        font-size: 23px;
        margin-top: 10px;

        a {
            margin: 0 10px;

            svg {
                fill: white;
            }
        }
    }
`;
