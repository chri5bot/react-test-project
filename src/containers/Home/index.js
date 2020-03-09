import React from "react";
import { Container, Header, Grid, Image, Segment } from "semantic-ui-react";

import { useAuth, useLoggedIn, CircularLoader } from "../../core";

const HomepageLayout = () => {
  const {
    state: { user }
  } = useAuth();

  useLoggedIn();

  if (!user) return <CircularLoader />;

  return (
    <Container
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Header as="h2" style={{ padding: "3rem", textAlign: "center" }}>
        Welcome {user.name}
      </Header>
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Lorem ipsum dolor sit amet.
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                facilisis erat odio, et laoreet nisl dapibus a. Aliquam
                porttitor velit vel risus aliquet, ac placerat elit
                sollicitudin. Fusce sit amet ultricies est. Cras lorem nulla,
                sodales vel sem vitae, iaculis facilisis est. Vestibulum at elit
                tincidunt, porta urna consectetur, aliquet massa.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://react.semantic-ui.com/images/wireframe/white-image.png"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ padding: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ padding: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "I shouldn't have gone with their competitor."
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/large/nan.jpg"
                />
                <b>John Doe</b> - Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default HomepageLayout;
