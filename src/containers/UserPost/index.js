import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Header, Image, Form } from "semantic-ui-react";

import {
  useAuth,
  useApiGet,
  useLoggedIn,
  useMedia,
  hasLength,
  CircularLoader,
  loremIpsum
} from "../../core";
import PostComments from "../../components/PostComments";

const UserPost = () => {
  const { postId } = useParams();
  const {
    state: { postImage }
  } = useLocation();
  const {
    state: { user }
  } = useAuth();
  const getPost = useApiGet(
    !user ? "posts" : `posts?userId=${user.id}&id=${postId}`
  );
  const isMobile = useMedia(767);

  useLoggedIn();

  if (!hasLength(getPost)) return <CircularLoader />;

  const { title, body } = getPost[0];
  const setBody = [body, ...loremIpsum];
  const postStyle = { margin: "2rem 1rem" };

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 0"
      }}
    >
      <Header
        as="h1"
        style={{ textTransform: "capitalize", textAlign: "center" }}
      >
        {title}
      </Header>
      <Image
        style={isMobile ? { margin: 0 } : postStyle}
        src={postImage}
        fluid
      />
      {setBody.map((val, i) => (
        <p key={i} style={{ ...postStyle, textTransform: "capitalize" }}>
          {val}
        </p>
      ))}
      <Header as="h3">Comments:</Header>
      <PostComments postId={postId} />
      <Form>
        <Form.Group style={{ flexDirection: "column" }}>
          <Form.Input placeholder="New Comment" />
          <Form.Button
            style={{
              float: "right",
              margin: "1rem 0"
            }}
            content="Add Comment"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UserPost;
