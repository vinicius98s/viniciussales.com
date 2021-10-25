import styled, { css } from "styled-components";
import * as SS from "styled-system";

type HeadingProps = {
  fontWeight?: 400 | 600 | 700;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & SS.ColorProps &
  SS.TypographyProps &
  SS.SpaceProps;

export const Heading = styled("h1").attrs<HeadingProps>(({ level = 1 }) => ({
  as: `h${level}`,
}))<HeadingProps>`
  ${css`
    ${SS.color};
    ${SS.typography};
    ${SS.space};
  `}
`;

type TextProps = SS.ColorProps & SS.TypographyProps & SS.SpaceProps;

export const Text = styled.p<TextProps>`
  ${SS.color};
  ${SS.typography};
  ${SS.space};
`;
