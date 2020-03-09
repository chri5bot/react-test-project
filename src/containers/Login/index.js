import React, { useCallback } from "react";
import { Container, Header, Dropdown } from "semantic-ui-react";

import {
  useApiGet,
  useAuth,
  useLoggedIn,
  getAvatars,
  hasLength,
  CircularLoader
} from "../../core";

const Login = () => {
  const users = useApiGet("users");

  const { userSignIn } = useAuth();

  const handleLogin = useCallback(
    user => () => {
      const { id, username, avatar } = user;
      const setUsername = username
        .toLowerCase()
        .split("_")
        .join("-");
      const userAvatar = avatar
        .split("/")
        .pop()
        .split(".")[0];
      const token = `${id}_${setUsername}_${userAvatar}`;

      userSignIn(token, user);
    },
    [userSignIn]
  );

  useLoggedIn();

  const avatars = users && getAvatars(users.length);

  const setUsers =
    users &&
    users.map((user, i) => ({
      ...user,
      key: user.id,
      text: user.name,
      value: user.name,
      image: {
        avatar: true,
        src: avatars[i]
      },
      avatar: avatars[i]
    }));

  if (!hasLength(users) || !hasLength(setUsers)) return <CircularLoader />;

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Header as="h2" style={{ padding: "3rem", textAlign: "center" }}>
        Select a user
      </Header>
      <Dropdown
        text="Select user"
        icon="user"
        className="icon"
        floating
        labeled
        button
        style={{ width: 250, alignSelf: "center" }}
      >
        <Dropdown.Menu>
          {setUsers.map(user => (
            <Dropdown.Item
              key={user.value}
              onClick={handleLogin(user)}
              {...user}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default Login;
