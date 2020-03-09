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

import { useAuth, placeParams, USER_PROFILE_ROUTE } from "../..";
import { menuItems } from "../../constants";

const getWidth = () =>
  typeof window === "undefined"
    ? Responsive.onlyTablet.minWidth
    : window.innerWidth;

const MenuItems = ({ active, handleSetActive }) =>
  menuItems.map(({ id, title, route }, i) => (
    <Menu.Item
      key={id}
      as={Link}
      to={route}
      active={active === i}
      onClick={handleSetActive(i)}
    >
      {title}
    </Menu.Item>
  ));

const HeaderDesktop = ({
  active,
  handleSetActive,
  user,
  userSignOut,
  handleSelectUser
}) => (
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
            <MenuItems active={active} handleSetActive={handleSetActive} />
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

const HeaderMobile = ({
  active,
  user,
  userSignOut,
  handleSelectUser,
  handleSetResponsiveActive
}) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const handleShowSidebar = useCallback(() => setSidebarOpened(true), []);
  const handleHideSidebar = useCallback(() => setSidebarOpened(false), []);

  const handleChangeView = useCallback(
    index => () => {
      handleHideSidebar();
      handleSetResponsiveActive(index);
    },
    [handleHideSidebar, handleSetResponsiveActive]
  );

  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={handleHideSidebar}
        visible={sidebarOpened}
        vertical
        style={{
          display: "flex",
          alignItems: "strech",
          position: "absolute",
          top: 99
        }}
      >
        <MenuItems active={active} handleSetActive={handleChangeView} />
        <Button
          as="a"
          inverted
          primary
          style={{ margin: "1.5em" }}
          onClick={userSignOut}
        >
          Log out
        </Button>
      </Sidebar>

      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 50, padding: "1em 0em" }}
        vertical
      >
        <Menu
          inverted
          pointing
          secondary
          size="large"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Menu.Item
            style={{
              padding: 0,
              margin: 0,
              marginLeft: "2rem",
              alignSelf: "center"
            }}
            onClick={handleShowSidebar}
          >
            <Icon name="sidebar" />
          </Menu.Item>
          {user && (
            <Menu.Item
              style={{ display: "flex", justifyContent: "center" }}
              position="right"
            >
              <Container
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
              </Container>
            </Menu.Item>
          )}
        </Menu>
      </Segment>
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
  const [active, setActive] = useState(0);
  const history = useHistory();
  const {
    state: { user },
    userSignOut
  } = useAuth();

  const handleSetActive = useCallback(index => () => setActive(index), []);
  const handleSetResponsiveActive = useCallback(index => setActive(index), []);

  const handleSelectUser = useCallback(() => {
    history.push(
      placeParams(USER_PROFILE_ROUTE, {
        username: user.username.toLowerCase()
      })
    );
    setActive(-1);
  }, [history, user]);

  const headerProps = {
    user,
    userSignOut,
    handleSelectUser,
    active,
    handleSetActive
  };

  return (
    <>
      <HeaderDesktop {...headerProps} />
      <HeaderMobile
        {...headerProps}
        handleSetResponsiveActive={handleSetResponsiveActive}
      />
    </>
  );
};

export default AppHeader;
