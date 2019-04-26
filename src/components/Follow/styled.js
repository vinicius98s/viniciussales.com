import styled from "styled-components";

export const FollowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 0;

    ${props =>
        props.header
            ? `
                position: absolute;
                right: 0;
                top: 50px;
                align-items: flex-end;
                transition: 0.3s ease-in-out;

                .social {
                    font-size: 25px;

                    a {
                        margin-left: 15px;

                        svg {
                            transition: 0.3s ease-in-out;

                            &:hover {
                                fill: var(--pink);
                                transform: scale(1.1);
                            }
                        }
                    }
                }
            `
            : `
                align-items: center;

                .social {
                    font-size: 23px;
                }
            `}

    h3 {
        font-weight: 200;
    }

    .social {
        margin-top: 10px;

        a {
            svg {
                fill: white;
            }
        }
    }
`;
