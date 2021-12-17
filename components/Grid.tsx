import styled from "@emotion/styled";
import * as SS from "styled-system";

export const Row = styled.div<SS.SpaceProps>`
  width: 624px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;

  ${SS.space}
`;

type ColumnSize = 1 | 2 | 3 | 4;

export const Col = styled.div<{ size: ColumnSize } & SS.SpaceProps>`
  grid-column: span ${(p) => p.size};

  ${SS.space}
`;

type FlexProps = SS.FlexboxProps & SS.SpaceProps & SS.ColorProps;
export const Flex = styled.div<FlexProps>`
  display: flex;

  ${SS.space}
  ${SS.flexbox}
  ${SS.color}
  ${SS.layout}
`;

type BoxProps = SS.SpaceProps & SS.ColorProps & SS.LayoutProps;
export const Box = styled.div<BoxProps>`
  display: block;

  ${SS.space}
  ${SS.color}
  ${SS.layout}
`;
