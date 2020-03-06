import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import axios from "axios";

import { API_URL, useAuthToken, getUrlAvatar } from "..";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext) || null;

const initialState = { user: null, token: null, isAuth: false };

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const { setToken, doesTokenExist, getToken, removeToken } = useAuthToken();

  const handleFetchUser = useCallback(
    async ([userId, _, avatarName]) =>
      await axios(`${API_URL}/users?id=${userId}`)
        .then(
          res =>
            res &&
            setState(val => ({
              ...val,
              user: {
                ...res.data[0],
                avatar: getUrlAvatar(avatarName)
              }
            }))
        )
        .catch(err => console.error(err)),
    [setState]
  );

  const userSignIn = useCallback(
    (token, user) => {
      setState(val => ({
        ...val,
        token,
        user,
        isAuth: !!token
      }));
      setToken(token);
    },
    [setToken]
  );

  useEffect(() => {
    if (doesTokenExist() && !state.isAuth) {
      const token = getToken();
      userSignIn(token, null);
      handleFetchUser(token.split("_"));
    }
  }, [state, doesTokenExist, getToken, userSignIn, handleFetchUser]);

  const userSignOut = useCallback(() => {
    setState(initialState);
    removeToken();
  }, [removeToken]);

  const value = useMemo(
    () => ({
      state,
      userSignIn,
      userSignOut
    }),
    [state, userSignIn, userSignOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthContextProvider };
