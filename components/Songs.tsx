import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import qs from "query-string";

import { Row, Col, Box, Flex } from "@components/Grid";
import { Heading, Text } from "@components/Typography";

import { Song } from "@services/spotify";

import spotify from "../public/spotify.png";

type Props = {
  songs: Song[];
  allowSpotifyIntegration: boolean;
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

function buildSpotifyIntegrationUrl() {
  const params = qs.stringify({
    scope: "user-top-read",
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  });

  return `https://accounts.spotify.com/authorize?${params}`;
}

const Songs: React.FC<Props> = ({ songs, allowSpotifyIntegration }) => {
  return (
    <Box as="section" my={7} px={[4, 0]}>
      <Heading level={2} mb={2}>
        What I&apos;ve been listening.
      </Heading>

      {allowSpotifyIntegration ? (
        <a href={buildSpotifyIntegrationUrl()}>
          <Image src={spotify} width={47} height={14} alt="Spotify" />
        </a>
      ) : (
        <Image src={spotify} width={47} height={14} alt="Spotify" />
      )}

      <Row mt={3} gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}>
        {songs.map((song) => {
          const artists = song.artists.map((artist) => artist.name).join(" & ");

          return (
            <Col size={2} key={song.id} mb={[3, 0]}>
              <Box bg="rgba(13, 171, 118, 0.25)" borderRadius="4px">
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
            </Col>
          );
        })}
      </Row>
    </Box>
  );
};

export default Songs;
