import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";

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

function buildSpotifyIntegrationUrl() {
  return `https://accounts.spotify.com/authorize?scope=user-top-read&response_type=code&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}`;
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
                <Link href={song.external_urls.spotify} passHref>
                  <SongLink target="_blank" rel="noreferrer">
                    <Flex alignItems="center" padding={1}>
                      <Image
                        src={song.album.images[0].url}
                        width={64}
                        height={64}
                        alt={song.name}
                        layout="fixed"
                      />
                    </Flex>
                    <div>
                      <Heading level={3} fontSize="20px" ml={2}>
                        {song.name}
                      </Heading>
                      <Text fontSize="14px" color="gray" ml={2}>
                        {artists}
                      </Text>
                    </div>
                    <Box position="absolute" top={2} right={2}>
                      <Image
                        width={15}
                        height={14}
                        src="/spotify-white.png"
                        alt="Spotify logo white"
                      />
                    </Box>
                  </SongLink>
                </Link>
              </Box>
            </Col>
          );
        })}
      </Row>
    </Box>
  );
};

export default Songs;
