import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const CircularLoader = () => (
  <Dimmer active>
    <Loader />
  </Dimmer>
);

export default CircularLoader;
