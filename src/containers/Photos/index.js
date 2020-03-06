import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";

import { useApiGet, useLoggedIn, hasLength, CircularLoader } from "../../core";
import PhotoModal from "../../components/PhotoModal";

const Photos = () => {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const { albumId } = useParams();

  const photos = useApiGet(`photos?albumId=${albumId}`);

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
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h2 style={{ padding: "3rem", textAlign: "center" }}>Your photos</h2>
      <Grid style={{ margin: "0 6rem" }}>
        <Grid.Row columns={4}>
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
    </div>
  );
};

export default Photos;
