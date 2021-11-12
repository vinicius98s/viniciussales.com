import theme from "@styles/theme";
import { IconProps } from "./Icon";

export default function Email({
  width = 12,
  height = 12,
  color = "primary",
}: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.15 8.40006C14.3835 8.39743 13.6241 8.54595 12.9151 8.83714C12.2061 9.12832 11.5615 9.55644 11.0182 10.097C10.4748 10.6376 10.0434 11.28 9.74855 11.9875C9.45373 12.6949 9.3013 13.4536 9.29999 14.2201V20.1001C9.29999 20.3388 9.39481 20.5677 9.56359 20.7365C9.73237 20.9052 9.96129 21.0001 10.2 21.0001H12.3C12.5387 21.0001 12.7676 20.9052 12.9364 20.7365C13.1052 20.5677 13.2 20.3388 13.2 20.1001V14.2201C13.1998 13.9475 13.257 13.6779 13.368 13.4289C13.479 13.1799 13.6412 12.9571 13.8441 12.775C14.0469 12.5929 14.2859 12.4556 14.5453 12.372C14.8048 12.2885 15.079 12.2606 15.35 12.2901C15.836 12.3513 16.2826 12.5887 16.6052 12.9574C16.9278 13.326 17.1038 13.8002 17.1 14.2901V20.1001C17.1 20.3388 17.1948 20.5677 17.3636 20.7365C17.5324 20.9052 17.7613 21.0001 18 21.0001H20.1C20.3387 21.0001 20.5676 20.9052 20.7364 20.7365C20.9052 20.5677 21 20.3388 21 20.1001V14.2201C20.9987 13.4536 20.8462 12.6949 20.5514 11.9875C20.2566 11.28 19.8252 10.6376 19.2818 10.097C18.7385 9.55644 18.0939 9.12832 17.3849 8.83714C16.6759 8.54595 15.9164 8.39743 15.15 8.40006Z"
        fill={theme.colors[color]}
      />
      <path
        d="M6.6 9.30005H3.9C3.40294 9.30005 3 9.70299 3 10.2V20.1C3 20.5971 3.40294 21 3.9 21H6.6C7.09706 21 7.5 20.5971 7.5 20.1V10.2C7.5 9.70299 7.09706 9.30005 6.6 9.30005Z"
        fill={theme.colors[color]}
      />
      <path
        d="M5.25 7.5C6.49264 7.5 7.5 6.49264 7.5 5.25C7.5 4.00736 6.49264 3 5.25 3C4.00736 3 3 4.00736 3 5.25C3 6.49264 4.00736 7.5 5.25 7.5Z"
        fill={theme.colors[color]}
      />
    </svg>
  );
}
