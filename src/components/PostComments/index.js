import React, { useState, useCallback, useEffect } from "react";
import { Segment, Container, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import { apiGetData, hasLength, CircularLoader } from "../../core";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const handleGetData = useCallback(async () => {
    const getComments =
      postId && (await apiGetData(`comments?postId=${postId}`));
    if (hasLength(getComments)) setComments(getComments);
  }, [postId]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  if (!hasLength(comments)) return <CircularLoader />;

  return comments.map(({ id, email, name, body }) => (
    <Segment key={id}>
      <Container style={{ display: "flex", padding: "1rem" }}>
        <Icon name="user" />
        <p style={{ color: "#444", fontSize: "1em" }}>{email.toLowerCase()}</p>
      </Container>
      <p
        style={{ textTransform: "capitalize", padding: "1rem" }}
      >{`${name} ${body}.`}</p>
    </Segment>
  ));
};
PostComments.propTypes = {
  postId: PropTypes.string.isRequired
};

export default PostComments;
