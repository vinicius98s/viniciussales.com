import theme from "@styles/theme";

import HeartOutline from "./heart-outline";
import heart from "./heart";
import email from "./email";
import github from "./github";
import linkedin from "./linkedin";
import twitter from "./twitter";

const Icons = {
  "heart-outline": HeartOutline,
  heart,
  email,
  github,
  linkedin,
  twitter,
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
