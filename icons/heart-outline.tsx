import theme from "@styles/theme";
import { IconProps } from "./Icon";

export default function HeartOutline({ width, height, color }: IconProps) {
  return (
    <svg
      width={width ?? 12}
      height={height ?? 12}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6.00018 10.5C5.93438 10.5004 5.86914 10.4878 5.80823 10.4629C5.74731 10.438 5.6919 10.4014 5.64518 10.355L1.76018 6.46501C1.27286 5.9726 0.999512 5.30779 0.999512 4.61501C0.999512 3.92222 1.27286 3.25742 1.76018 2.76501C2.25131 2.27526 2.9166 2.00024 3.61018 2.00024C4.30376 2.00024 4.96905 2.27526 5.46018 2.76501L6.00018 3.30501L6.54018 2.76501C7.03131 2.27526 7.6966 2.00024 8.39018 2.00024C9.08376 2.00024 9.74905 2.27526 10.2402 2.76501C10.7275 3.25742 11.0008 3.92222 11.0008 4.61501C11.0008 5.30779 10.7275 5.9726 10.2402 6.46501L6.35518 10.355C6.30846 10.4014 6.25305 10.438 6.19213 10.4629C6.13121 10.4878 6.06598 10.5004 6.00018 10.5ZM3.61018 3.00001C3.39852 2.99905 3.18877 3.0401 2.99308 3.12078C2.7974 3.20145 2.61967 3.32016 2.47018 3.47001C2.16821 3.77357 1.9987 4.18433 1.9987 4.61251C1.9987 5.04069 2.16821 5.45145 2.47018 5.75501L6.00018 9.29001L9.53018 5.75501C9.83215 5.45145 10.0017 5.04069 10.0017 4.61251C10.0017 4.18433 9.83215 3.77357 9.53018 3.47001C9.22201 3.17886 8.81413 3.01666 8.39018 3.01666C7.96623 3.01666 7.55835 3.17886 7.25018 3.47001L6.35518 4.37001C6.3087 4.41687 6.2534 4.45407 6.19247 4.47945C6.13154 4.50484 6.06619 4.51791 6.00018 4.51791C5.93417 4.51791 5.86882 4.50484 5.80789 4.47945C5.74696 4.45407 5.69166 4.41687 5.64518 4.37001L4.75018 3.47001C4.60069 3.32016 4.42296 3.20145 4.22728 3.12078C4.03159 3.0401 3.82184 2.99905 3.61018 3.00001Z"
        fill={theme.colors[color ?? "primary"]}
      />
    </svg>
  );
}
