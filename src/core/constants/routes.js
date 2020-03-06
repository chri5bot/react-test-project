export const ROOT_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const USER_PROFILE_ROUTE = "/user/:username";

export const placeParams = (pathRegex, params) =>
  Object.keys(params).reduce(
    (newPath, key) => newPath.replace(new RegExp(`:${key}`), params[key]),
    pathRegex
  );
