import React from "react";

import ContextProviders from "./core/context";
import Routes from "./Routes";

const App = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <ContextProviders>
      <Routes />
    </ContextProviders>
  </div>
);

export default App;
