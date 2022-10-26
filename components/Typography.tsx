import styled from "@emotion/styled";
import { forwardRef, PropsWithChildren } from "react";
import * as SS from "styled-system";

type TextProps = SS.ColorProps &
  SS.TypographyProps &
  SS.SpaceProps &
  SS.LayoutProps;

export const Text = styled.p<TextProps>`
  ${SS.color};
  ${SS.typography};
  ${SS.space};
  ${SS.layout};
`;

type HeadingProps = TextProps & {
  fontWeight?: 400 | 600 | 700;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Heading = forwardRef<
  HTMLHeadingElement,
  PropsWithChildren<HeadingProps>
>(({ color, ...props }, ref) => (
  <Text color={color as any} ref={ref} as={`h${props.level ?? 1}`} {...props} />
));

Heading.displayName = "Heading";
