import React from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";

import { useLoggedIn, useAuth, CircularLoader } from "../../core";
import UserAccordion from "../../components/UserAccordion";
import UserMap from "../../components/UserMap";

const UserProfile = () => {
  useLoggedIn();

  const {
    state: { user }
  } = useAuth();

  if (!user) return <CircularLoader />;

  const {
    avatar,
    name,
    username,
    email,
    phone,
    website,
    address,
    company
  } = user;

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Grid container stackable>
          <Grid.Row>
            <Grid.Column>
              <Image bordered rounded size="tiny" src={avatar} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h3" style={{ fontSize: "2em", margin: 0 }}>
                {name}
              </Header>
              <p style={{ fontSize: "0.8rem", color: "grey" }}>
                @{username.toLowerCase()}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <UserAccordion
        personalInfo={{
          email,
          phone,
          website
        }}
        address={address}
        company={company}
      />
      <UserMap coords={address.geo} />
    </div>
  );
};

export default UserProfile;
