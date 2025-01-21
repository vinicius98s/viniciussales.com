import Zoom from "react-medium-image-zoom";
import { type ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { Box } from "@components/Grid";

type Props = {
  image: ImageBlockObjectResponse["image"];
};

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function Image({ image }: Props) {
  const src = image.type === "external" ? image.external.url : image.file.url;

  return (
    <Box mb={4}>
      <Zoom zoomMargin={12} IconUnzoom={CloseIcon}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width="100%" alt={image.caption[0]?.plain_text ?? ""} src={src} />
      </Zoom>
    </Box>
  );
}
