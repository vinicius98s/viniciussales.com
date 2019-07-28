import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
  width: 100vw;
  height: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const ProgressBar = styled.div`
  height: 5px;
  top: 0;
  background-color: ${({ progressColor }) => progressColor};
  width: ${({ width }) => `${width}%`};
`;
