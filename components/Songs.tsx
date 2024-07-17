import Image from "next/image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { Row, Col, Box, Flex } from "@components/Grid";
import { Heading, Text } from "@components/Typography";

import { Song } from "@services/spotify.types";

import spotify from "../public/spotify.png";

type Props = {
  songs: Song[];
};

const SongLink = styled.a`
  text-decoration: none;
  color: ${(p) => p.theme.colors.white};
  display: flex;
  align-items: center;
  position: relative;

  img {
    border-radius: 4px;
  }
`;

const SongTextWrapper = styled(Box)`
  h3 {
    max-height: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Songs: React.FC<Props> = ({ songs }) => {
  return (
    <Box as="section" my={7}>
      <Heading level={2} mb={2}>
        What I&apos;ve been listening.
      </Heading>

      <Image src={spotify} width={47} height={14} alt="Spotify" />

      <Row mt={3} gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}>
        {songs.map((song) => {
          const artists = song.artists.map((artist) => artist.name).join(" & ");

          return (
            <Col key={song.id} size={2} mb={[3, 0]}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Box bg="rgba(13, 171, 118, 0.1)" borderRadius="4px">
                  <SongLink
                    href={song.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    title={song.name}
                  >
                    <Flex padding={2}>
                      <Image
                        src={song.album.images[0].url}
                        width={64}
                        height={64}
                        alt={song.name}
                      />
                    </Flex>
                    <SongTextWrapper pr={5}>
                      <Heading level={3} fontSize="18px" ml={1}>
                        {song.name}
                      </Heading>
                      <Text fontSize="14px" color="gray" ml={1}>
                        {artists}
                      </Text>
                    </SongTextWrapper>
                    <Box position="absolute" top={2} right={2}>
                      <Image
                        width={15}
                        height={14}
                        src="/spotify-white.png"
                        alt="Spotify logo white"
                      />
                    </Box>
                  </SongLink>
                </Box>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Box>
  );
};

export default Songs;
