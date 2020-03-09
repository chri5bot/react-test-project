import React from "react";
import { Image, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

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
PhotoModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.object
};
PhotoModal.defaultProps = {
  open: false,
  photo: {}
};

export default PhotoModal;
