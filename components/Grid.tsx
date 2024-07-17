import styled from "@emotion/styled";
import * as SS from "styled-system";

type RowProps = SS.SpaceProps & SS.GridProps;
export const Row = styled.div<RowProps>`
  width: 100%;
  max-width: 692px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;

  ${SS.space}
  ${SS.grid}
`;

type ColumnSize = 1 | 2 | 3 | 4;

export const Col = styled.div<{ size: ColumnSize } & SS.SpaceProps>`
  grid-column: span ${(p) => p.size};

  ${SS.space}
`;

type FlexProps = SS.FlexboxProps &
  SS.SpaceProps &
  SS.ColorProps &
  SS.BorderProps &
  SS.PositionProps &
  SS.TextAlignProps;

export const Flex = styled.div<FlexProps>`
  display: flex;

  ${SS.space}
  ${SS.flexbox}
  ${SS.color}
  ${SS.layout}
  ${SS.border}
  ${SS.position}
  ${SS.textAlign}
`;

type BoxProps = SS.SpaceProps &
  SS.ColorProps &
  SS.LayoutProps &
  SS.BorderProps &
  SS.PositionProps;
export const Box = styled.div<BoxProps>`
  display: block;

  ${SS.space}
  ${SS.color}
  ${SS.layout}
  ${SS.border}
  ${SS.position}
`;
