import axios from "axios";

export const API_URL = "https://jsonplaceholder.typicode.com";

const handleErr = err => console.error(err);

export const apiGetData = async query =>
  await axios(`${API_URL}/${query}`)
    .then(res => res.data)
    .catch(handleErr);

export const apiCreate = async (query, values) =>
  await axios
    .post(`${API_URL}/${query}`, values)
    .then(res => res.data)
    .catch(handleErr);

export const apiUpdate = async (query, values) =>
  await axios
    .put(`${API_URL}/${query}`, values)
    .then(res => res.data)
    .catch(handleErr);

export const apiDelete = async query =>
  await axios
    .delete(`${API_URL}/${query}`)
    .then(res => res.data)
    .catch(handleErr);
