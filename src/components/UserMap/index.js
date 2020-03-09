import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const UserMap = ({ coords: { lat, lng } }) => {
  const latitude = parseInt(lat, 10);
  const longitude = parseInt(lng, 10);
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 3,
    minZoom: 3
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1IjoiY2hyaXN0aG9waCIsImEiOiJjazU5cHJqb2cwZWJtM21uMzM0cW15czlzIn0.by-HeUKpsI2Q2dpu2JV7jg"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      height="500px"
      width="100vw"
      onViewportChange={setViewport}
      {...viewport}
    >
      <Marker latitude={latitude} longitude={longitude}>
        <Icon size="big" name="map marker alternate" color="red" />
      </Marker>
    </ReactMapGL>
  );
};
UserMap.propTypes = {
  coords: PropTypes.shape({
    lat: PropTypes.string,
    lng: PropTypes.string
  }).isRequired
};

export default UserMap;
