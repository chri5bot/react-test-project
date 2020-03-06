import React, { useCallback } from "react";
import { Grid, Image, Button } from "semantic-ui-react";

import {
  useApiGet,
  useAuth,
  useLoggedIn,
  getAvatars,
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
    users && users.map((user, i) => ({ ...user, avatar: avatars[i] }));

  if (!users || !setUsers) return <CircularLoader />;

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <h2 style={{ padding: "3rem", textAlign: "center" }}>
        Selecciona un usuario
      </h2>
      <Grid style={{ margin: 0 }} columns={3} centered>
        {setUsers &&
          setUsers.map(user => (
            <Grid.Column
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2rem"
              }}
              key={user.id}
            >
              <Button
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
                onClick={handleLogin(user)}
              >
                <Image
                  avatar
                  style={{ height: "3rem", width: "3rem", marginRight: "1rem" }}
                  src={user.avatar}
                />
                {user.name}
              </Button>
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
};

export default Login;
