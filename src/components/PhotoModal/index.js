import React from "react";
import { Image, Modal } from "semantic-ui-react";

const PhotoModal = ({ open, onClose, photo }) =>
  photo && (
    <Modal open={open} onClose={onClose} style={{ width: "min-content" }}>
      <Modal.Content image style={{ flexDirection: "column" }}>
        <Image wrapped size="medium" src={photo.url} />
        <Modal.Description style={{ marginTop: "1rem", padding: 0 }}>
          <p style={{ textAlign: "justify", textTransform: "capitalize" }}>
            {photo.title}
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

export default PhotoModal;
