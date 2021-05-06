import axios from "axios";

const { VITE_API_URL } = import.meta.env;

console.log(VITE_API_URL);

const FULL_API_URL = `${VITE_API_URL}/api/v1`;

export const getSongs = () =>
  axios.get(`${FULL_API_URL}/songs`).then(({ data }) => data);
