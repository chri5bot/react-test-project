import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Responsive,
  Button,
  Container,
  Icon,
  Menu,
  Image,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import PropTypes from "prop-types";

import { useAuth, placeParams, ROOT_ROUTE, USER_PROFILE_ROUTE } from "../..";

const getWidth = () =>
  typeof window === "undefined"
    ? Responsive.onlyTablet.minWidth
    : window.innerWidth;

const HeaderDesktop = ({ user, userSignOut, handleSelectUser }) => (
  <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
    <Visibility once={false}>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 50, padding: "1em 0em" }}
        vertical
      >
        <Menu inverted pointing secondary size="large">
          <Container>
            <Menu.Item as={Link} to={ROOT_ROUTE} active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Albums</Menu.Item>
            <Menu.Item as="a">Posts</Menu.Item>
            {user && (
              <Menu.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 0
                }}
                position="right"
              >
                <div
                  style={{ margin: "0 1rem", cursor: "pointer" }}
                  onClick={handleSelectUser}
                >
                  <Image
                    avatar
                    style={{
                      height: "3rem",
                      width: "3rem",
                      marginRight: "1rem"
                    }}
                    src={user.avatar}
                  />
                  {user.name}
                </div>
                <Button
                  as="a"
                  inverted
                  primary
                  style={{ marginLeft: "0.5em" }}
                  onClick={userSignOut}
                >
                  Log out
                </Button>
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </Segment>
    </Visibility>
  </Responsive>
);
HeaderDesktop.propTypes = {
  user: PropTypes.object,
  userSignOut: PropTypes.func.isRequired,
  handleSelectUser: PropTypes.func.isRequired
};
HeaderDesktop.defaultProps = {
  user: null
};

const HeaderMobile = ({ user, userSignOut, handleSelectUser }) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const toggleSidebarOpen = useCallback(() => setSidebarOpened(val => val), []);

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={toggleSidebarOpen}
        visible={sidebarOpened}
        vertical
      >
        <Menu.Item as={Link} to={ROOT_ROUTE} active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Albums</Menu.Item>
        <Menu.Item as="a">Posts</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 50, padding: "1em 0em" }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={toggleSidebarOpen}>
                <Icon name="sidebar" />
              </Menu.Item>
              {user && (
                <Menu.Item
                  style={{ display: "flex", justifyContent: "center" }}
                  position="right"
                >
                  <div
                    style={{ margin: "0 1rem", cursor: "pointer" }}
                    onClick={handleSelectUser}
                  >
                    <Image
                      avatar
                      style={{
                        height: "3rem",
                        width: "3rem",
                        marginRight: "1rem"
                      }}
                      src={user.avatar}
                    />
                    {user.name}
                  </div>
                  <Button
                    as="a"
                    inverted
                    primary
                    style={{ marginLeft: "0.5em" }}
                    onClick={userSignOut}
                  >
                    Log out
                  </Button>
                </Menu.Item>
              )}
            </Menu>
          </Container>
        </Segment>
      </Sidebar.Pusher>
    </Responsive>
  );
};
HeaderMobile.propTypes = {
  user: PropTypes.object,
  userSignOut: PropTypes.func.isRequired,
  handleSelectUser: PropTypes.func.isRequired
};
HeaderMobile.defaultProps = {
  user: null
};

const AppHeader = () => {
  const history = useHistory();
  const {
    state: { user },
    userSignOut
  } = useAuth();

  const handleSelectUser = useCallback(
    () => history.push(placeParams(USER_PROFILE_ROUTE, { userId: user.id })),
    [history, user]
  );

  const headerProps = {
    user,
    userSignOut,
    handleSelectUser
  };

  return (
    <>
      <HeaderDesktop {...headerProps} />
      <HeaderMobile {...headerProps} />
    </>
  );
};

export default AppHeader;
