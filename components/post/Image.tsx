import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import NextImage from "next/image";
import styled from "@emotion/styled";

import { Box } from "@components/Grid";

type Props = {
  image: ImageBlockObjectResponse["image"];
};

const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 575px) {
    max-height: 350px;
  }

  @media (max-width: 400px) {
    max-height: 300px;
  }

  img {
    object-fit: contain;
    object-position: center;
  }
`;

export default function Image({ image }: Props) {
  const src = image.type === "external" ? image.external.url : image.file.url;

  return (
    <ImageWrapper>
      <NextImage
        src={src}
        alt={image.caption[0]?.plain_text ?? ""}
        sizes="100%"
        fill
      />
    </ImageWrapper>
  );
}
