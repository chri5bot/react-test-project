import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Header, Segment, Image } from "semantic-ui-react";
import axios from "axios";

import {
  useAuth,
  useApiGet,
  useLoggedIn,
  hasLength,
  useMedia,
  UNSPLASH_API,
  UNSPLASH_KEY_API,
  USER_POST_ROUTE,
  placeParams,
  CircularLoader
} from "../../core";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const {
    state: { user }
  } = useAuth();
  const getPosts = useApiGet(!user ? "posts" : `posts?userId=${user.id}`);
  const isMobile = useMedia(767);

  const handleSetPosts = useCallback(
    async () =>
      await axios(
        `${UNSPLASH_API}?orientation=landscape&count=${getPosts.length}&client_id=${UNSPLASH_KEY_API}`
      )
        .then(res => {
          const getImages = res.data.map(({ urls }) => urls);
          const postsWithImage = getPosts.map((post, i) => ({
            ...post,
            image: getImages[i]
          }));

          setPosts(postsWithImage);
        })
        .catch(err => console.error(err)),
    [getPosts, setPosts]
  );

  const handleSelectPost = useCallback(
    (postId, postImage) => () =>
      history.push({
        pathname: placeParams(USER_POST_ROUTE, { postId }),
        state: { postImage }
      }),
    [history]
  );

  useLoggedIn();

  useEffect(() => {
    if (hasLength(getPosts)) handleSetPosts();
  }, [getPosts, handleSetPosts]);

  if (!hasLength(posts)) return <CircularLoader />;

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        marginBottom: "2rem"
      }}
    >
      <Header as="h2" style={{ padding: "3rem", textAlign: "center" }}>
        Your posts
      </Header>
      {hasLength(posts) &&
        posts.map(({ id, title, body, image: { small, regular } }) => (
          <Segment
            key={id}
            onClick={handleSelectPost(id, regular)}
            style={{
              maxWidth: "820px",
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              justifyContent: "space-between",
              margin: "1rem auto",
              cursor: "pointer"
            }}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                marginRight: "2rem"
              }}
            >
              <Header as="h3" style={{ textTransform: "capitalize" }}>
                {title}
              </Header>
              <p style={{ textTransform: "capitalize" }}>
                {body.length > 100 ? `${body.slice(0, 100)}...` : body}
              </p>
            </Container>
            <Image
              style={
                isMobile
                  ? { marginBottom: "1rem" }
                  : { width: 200, marginLeft: "0.5em" }
              }
              fluid={isMobile}
              src={small}
            />
          </Segment>
        ))}
    </Container>
  );
};

export default Posts;
