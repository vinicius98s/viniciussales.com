import { useRef, useState, type ReactNode } from "react";
import styled from "@emotion/styled";

import theme from "@styles/theme";

type Props = {
  children: ReactNode;
  content: ReactNode;
};

const Trigger = styled.button`
  position: relative;
  background: transparent;
  border: none;
`;

const ContentContainer = styled.span<{ $top: number; $left: number }>`
  position: fixed;
  margin-top: ${(p) => p.theme.space.at(1)}px;
  left: ${(p) => p.$left}px;
  top: ${(p) => p.$top}px;
  background: ${(p) => p.theme.colors.darkGray};
  color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.space.at(2)}px;
  border-radius: ${(p) => p.theme.space.at(1)}px;
  font-size: 14px;

  ::after {
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    margin: 0 auto;
    right: 0;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${(p) => p.theme.colors.darkGray};
  }
`;

function Popover({ content, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const width = ref.current?.offsetWidth ?? 0;
  const height = ref.current?.offsetHeight ?? 0;
  const left = (ref.current?.offsetLeft ?? 0) - width / 2;
  const top = (ref.current?.offsetTop ?? 0) + height + theme.space[1];

  return (
    <Trigger
      ref={ref}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      aria-expanded={isOpen}
      onClick={() => setIsOpen((isOpened) => !isOpened)}
    >
      {children}
      {isOpen && (
        <ContentContainer $top={top} $left={left} role="region">
          {content}
        </ContentContainer>
      )}
    </Trigger>
  );
}

export default Popover;
