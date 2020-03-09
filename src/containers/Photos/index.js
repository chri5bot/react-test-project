import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Grid, Image } from "semantic-ui-react";

import {
  useApiGet,
  useLoggedIn,
  useMedia,
  hasLength,
  CircularLoader
} from "../../core";
import PhotoModal from "../../components/PhotoModal";

const Photos = () => {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const { albumId } = useParams();
  const photos = useApiGet(`photos?albumId=${albumId}`);
  const isMobile = useMedia(767);

  const handleHideModal = useCallback(() => {
    setPhoto(null);
    setOpen(false);
  }, []);

  const handleSelectPhoto = useCallback(
    select => () => {
      setPhoto(select);
      setOpen(true);
    },
    []
  );

  useLoggedIn();

  if (!hasLength(photos)) return <CircularLoader />;

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header as="h2" style={{ padding: "3rem", textAlign: "center" }}>
        Your photos
      </Header>
      <Grid style={{ margin: isMobile ? "0 2rem" : "0 6rem" }}>
        <Grid.Row columns={isMobile ? 2 : 4}>
          {hasLength(photos) &&
            photos.map(({ id, thumbnailUrl, title, url }) => (
              <Grid.Column
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem 0"
                }}
              >
                <Image
                  src={thumbnailUrl}
                  alt={title}
                  style={{ cursor: "pointer" }}
                  onClick={handleSelectPhoto({ id, title, url })}
                />
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
      <PhotoModal open={open} onClose={handleHideModal} photo={photo} />
    </Container>
  );
};

export default Photos;
