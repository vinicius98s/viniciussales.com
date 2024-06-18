import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

import { Box } from "./Grid";
import { Text } from "./Typography";

const Wrapper = styled(Box)`
  background: ${(p) => p.theme.colors.darkGray};
  padding: ${(p) => `${p.theme.space[1]}px ${p.theme.space[2]}px`};
  border-radius: ${(p) => p.theme.space[1]}px;
  text-align: center;
`;

function Badge({ children }: PropsWithChildren) {
  return (
    <Wrapper>
      <Text fontSize="14px" fontWeight={600}>
        {children}
      </Text>
    </Wrapper>
  );
}

export default Badge;
