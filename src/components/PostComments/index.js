import React, { useState, useCallback, useEffect } from "react";
import { Segment, Dropdown, Container, Icon, Form } from "semantic-ui-react";
import PropTypes from "prop-types";

import {
  useAuth,
  apiGetData,
  apiCreate,
  apiDelete,
  hasLength,
  CircularLoader
} from "../../core";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const {
    state: { user }
  } = useAuth();

  const handleGetData = useCallback(async () => {
    const getComments =
      postId && (await apiGetData(`comments?postId=${postId}`));
    if (hasLength(getComments)) setComments(getComments);
  }, [postId]);

  const handleNewComment = useCallback(e => {
    const {
      target: { value }
    } = e;
    e.persist();
    setComment(value);
  }, []);

  const handleAddComment = useCallback(() => {
    const newComment = {
      id: `t_${comments.length + 1}_u_${user.id}`,
      name: "",
      email: user.email,
      body: comment
    };

    setComment("");
    apiCreate("comments", newComment);
    setComments(val => [...val, newComment]);
  }, [setComments, comments, comment, user]);

  const handleDeleteTask = useCallback(
    commentId => async () => {
      const newComments = comments.filter(({ id }) => id !== commentId);
      setComments(newComments);
      apiDelete(postId && `comments?postId=${postId}&id=${commentId}`);
    },
    [comments, postId]
  );

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  if (!hasLength(comments)) return <CircularLoader />;

  return (
    <>
      {comments.map(({ id, email, name, body }) => (
        <Segment key={id}>
          <Container
            style={{ display: "flex", padding: "1rem", position: "relative" }}
          >
            <Icon name="user" />
            <p style={{ color: "#444", fontSize: "1em" }}>
              {email.toLowerCase()}
            </p>
            <Dropdown style={{ position: "absolute", top: 0, right: 5 }}>
              <Dropdown.Menu>
                <Dropdown.Item text="Delete" onClick={handleDeleteTask(id)} />
              </Dropdown.Menu>
            </Dropdown>
          </Container>
          <p
            style={{ textTransform: "capitalize", padding: "1rem" }}
          >{`${name} ${body}.`}</p>
        </Segment>
      ))}
      <Form onSubmit={comment !== "" ? handleAddComment : null}>
        <Form.Group style={{ flexDirection: "column" }}>
          <Form.TextArea
            onChange={handleNewComment}
            value={comment}
            placeholder="New Comment"
          />
          <Form.Button
            style={{
              float: "right",
              margin: "1rem 0"
            }}
            content="Add Comment"
          />
        </Form.Group>
      </Form>
    </>
  );
};
PostComments.propTypes = {
  postId: PropTypes.string.isRequired
};

export default PostComments;
