import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Segment, Image } from "semantic-ui-react";

import {
  useAuth,
  useApiGet,
  useLoggedIn,
  hasLength,
  UNSPLASH_API,
  UNSPLASH_KEY_API,
  CircularLoader
} from "../../core";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const {
    state: { user }
  } = useAuth();
  const getPosts = useApiGet(!user ? "posts" : `posts?userId=${user.id}`);

  const handleSetPosts = useCallback(
    async () =>
      await axios(
        `${UNSPLASH_API}?orientation=landscape&count=${getPosts.length}&client_id=${UNSPLASH_KEY_API}`
      )
        .then(res => {
          const getImages = res.data.map(({ urls }) => urls.small);
          const postsWithImage = getPosts.map((post, i) => ({
            ...post,
            image: getImages[i]
          }));

          setPosts(postsWithImage);
        })
        .catch(err => console.error(err)),
    [getPosts, setPosts]
  );

  useLoggedIn();

  useEffect(() => {
    if (hasLength(getPosts)) handleSetPosts();
  }, [getPosts, handleSetPosts]);

  if (!hasLength(posts)) return <CircularLoader />;

  console.log("posts: ", posts);
  console.log("posts body length: ", posts[9].body.length);

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        marginBottom: "2rem"
      }}
    >
      <h2 style={{ padding: "3rem", textAlign: "center" }}>Your posts</h2>
      {hasLength(posts) &&
        posts.map(({ id, title, body, image }) => (
          <Segment
            key={id}
            style={{
              maxWidth: "820px",
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem auto",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                marginRight: "2rem"
              }}
            >
              <h3 style={{ textTransform: "capitalize" }}>{title}</h3>
              <p style={{ textTransform: "capitalize" }}>
                {body.length > 100 ? `${body.slice(0, 100)}...` : body}
              </p>
            </div>
            <Image size="small" src={image} />
          </Segment>
        ))}
    </div>
  );
};

export default Posts;
