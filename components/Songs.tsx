import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";

import { Row, Col, Box } from "@components/Grid";
import { Heading, Text } from "@components/Typography";

import { Song } from "@services/spotify";

import spotify from "../public/spotify.png";

type Props = {
  songs: Song[];
};

const SongLink = styled.a`
  text-decoration: none;
  color: ${(p) => p.theme.colors.white};
  display: flex;
`;

const Songs: React.FC<Props> = ({ songs }) => {
  return (
    <Box as="section" my={7}>
      <Heading level={2} mb={2}>
        What I&apos;ve been listening.
      </Heading>
      <Image src={spotify} width={47} height={14} alt="Spotify" />
      <Row mt={3}>
        {songs.map((song) => {
          const artists = song.artists.map((artist) => artist.name).join(" & ");

          return (
            <Col size={2} key={song.id}>
              <Link href={song.external_urls.spotify} passHref>
                <SongLink target="_blank" rel="noreferrer">
                  <Image
                    src={song.album.images[0].url}
                    width={64}
                    height={64}
                    alt={song.name}
                  />
                  <div>
                    <Heading level={3} fontSize="20px" ml={2}>
                      {song.name}
                    </Heading>
                    <Text fontSize="14px" color="gray" ml={2}>
                      {artists}
                    </Text>
                  </div>
                </SongLink>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Box>
  );
};

export default Songs;
