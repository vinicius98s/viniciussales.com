import styled from "styled-components";

export const StyledPostPreviewWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .title {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }
`;

export const StyledPostPreview = styled.div`
    width: 30%;
    background: var(--lightGrey);
    margin: 0 10px 30px 10px;
    box-shadow: 0 0 25px rgba(20, 20, 20, 0.68);
    text-align: center;
    border-radius: 10px;

    h1 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .info {
        padding: 20px 0;
    }

    img {
        width: 100%;
        border-radius: 10px 10px 0 0;
    }
`;
