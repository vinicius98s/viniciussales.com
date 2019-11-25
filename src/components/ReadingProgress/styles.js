import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
  width: 100vw;
  height: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const ProgressBar = styled.div.attrs(({ width }) => ({
  style: {
    width: `${width}%`,
  },
}))`
  height: 5px;
  top: 0;
  background-color: ${({ progressColor }) => progressColor};
`;
