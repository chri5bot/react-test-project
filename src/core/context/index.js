import React from "react";

import { AuthContextProvider } from "./authContext";
export * from "./authContext";

const ContextProviders = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

export default ContextProviders;
