import * as HoverCard from "@radix-ui/react-hover-card";
import { type ReactNode } from "react";
import styled from "@emotion/styled";

type Props = {
  children: ReactNode;
  content: ReactNode;
  width?: number;
  event?: string;
};

const Content = styled(HoverCard.Content)<{ $width: number }>`
  width: ${(p) => p.$width}px;
  background: ${(p) => p.theme.colors.darkGray};
  padding: ${(p) => p.theme.space.at(2)}px;
  border-radius: ${(p) => p.theme.space.at(1)}px;
  font-size: 14px;
`;

const Arrow = styled(HoverCard.Arrow)`
  fill: ${(p) => p.theme.colors.darkGray};
`;

function Popover({
  content,
  children,
  width: contentWidth = 200,
  event,
}: Props) {
  const onOpenChange = (open: boolean) => {
    if (event && open) {
      window.umami?.track(event);
    }
  };

  return (
    <HoverCard.Root openDelay={300} onOpenChange={onOpenChange}>
      <HoverCard.Trigger>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <Content $width={contentWidth} sideOffset={5}>
          {content}
          <Arrow />
        </Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export default Popover;
