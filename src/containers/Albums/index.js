import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Header, Image, Table } from "semantic-ui-react";
import axios from "axios";

import {
  useAuth,
  useApiGet,
  useLoggedIn,
  API_URL,
  PHOTOS_ALBUM_ROUTE,
  placeParams,
  hasLength,
  CircularLoader
} from "../../core";

const Albums = () => {
  const [photoAlbums, setPhotoAlbums] = useState([]);
  const {
    state: { user }
  } = useAuth();
  const albums = useApiGet(!user ? "albums" : `albums?userId=${user.id}`);
  const history = useHistory();

  const handleSetAlbums = useCallback(
    () =>
      albums.map(async album => {
        await axios(`${API_URL}/photos?albumId=${album.id}`)
          .then(res => {
            const [firstPhoto] = res.data;

            setPhotoAlbums(val => [
              ...val,
              {
                ...album,
                thumbnailUrl: firstPhoto.thumbnailUrl
              }
            ]);
          })
          .catch(err => console.error(err));
      }),
    [albums, setPhotoAlbums]
  );

  const handleSelectAlbum = useCallback(
    albumId => () => history.push(placeParams(PHOTOS_ALBUM_ROUTE, { albumId })),
    [history]
  );

  useLoggedIn();

  useEffect(() => {
    if (hasLength(albums)) handleSetAlbums();
  }, [albums, handleSetAlbums]);

  if (!hasLength(albums) && !hasLength(photoAlbums)) return <CircularLoader />;

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header as="h2" style={{ padding: "3rem", textAlign: "center" }}>
        Select a album
      </Header>
      <Table
        basic="very"
        celled
        collapsing
        selectable
        style={{ margin: "0 2.5rem 1rem 2.5rem" }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              Album Photo
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              Album Title
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {hasLength(photoAlbums) &&
            photoAlbums.map(({ id, thumbnailUrl, title }) => (
              <Table.Row
                key={id}
                style={{ cursor: "pointer" }}
                onClick={handleSelectAlbum(id)}
              >
                <Table.Cell>
                  <Header
                    as="h4"
                    image
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Image src={thumbnailUrl} rounded size="big" />
                  </Header>
                </Table.Cell>
                <Table.Cell style={{ textTransform: "capitalize" }}>
                  {title}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Albums;
