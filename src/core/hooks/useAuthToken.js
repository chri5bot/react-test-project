const AUTH_TOKEN = "@auth_token";

export const useAuthToken = () => {
  const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
  const getToken = () => localStorage.getItem(AUTH_TOKEN);
  const removeToken = () => localStorage.removeItem(AUTH_TOKEN);
  const doesTokenExist = () => getToken() !== null && getToken() !== undefined;

  return {
    setToken,
    getToken,
    removeToken,
    doesTokenExist
  };
};
