import theme from "@styles/theme";

import HeartOutline from "./heart-outline";
import heart from "./heart";
import { Box } from "@components/Grid";

const Icons = {
  "heart-outline": HeartOutline,
  heart,
};

export type IconProps = {
  width?: number;
  height?: number;
  color?: keyof typeof theme["colors"];
};

type Props = {
  name: keyof typeof Icons;
  onClick?: () => void;
} & IconProps;

export default function Icon({ name, ...props }: Props) {
  const IconComponent = Icons[name];

  return (
    <div style={{ display: "inherit" }} onClick={props.onClick}>
      <IconComponent {...props} />
    </div>
  );
}
