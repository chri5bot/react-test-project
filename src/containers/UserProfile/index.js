import React from "react";
import { useParams } from "react-router-dom";

import { useLoggedIn } from "../../core";

const UserProfile = () => {
  const params = useParams();

  console.log("params: ", params);

  useLoggedIn();

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <h2 style={{ padding: "3rem", textAlign: "center" }}>User Profile</h2>
    </div>
  );
};

export default UserProfile;
