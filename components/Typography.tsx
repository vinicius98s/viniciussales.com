import styled from "@emotion/styled";
import { forwardRef, PropsWithChildren, type HTMLProps } from "react";
import * as SS from "styled-system";

type TextProps = SS.ColorProps &
  SS.TypographyProps &
  SS.SpaceProps &
  SS.LayoutProps;

export const Text = styled.p<TextProps>`
  font-size: 1.1rem;

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
  PropsWithChildren<HeadingProps & HTMLProps<HTMLHeadingElement>>
>(({ color, ...props }, ref) => (
  <Text
    color={color as any}
    ref={ref}
    as={`h${props.level ?? 1}` as any}
    fontSize="larger"
    {...props}
  />
));

Heading.displayName = "Heading";
