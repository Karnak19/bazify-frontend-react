import axios from "axios";

const { REACT_APP_BASE_API_URL } = process.env;

const API_URL = `${REACT_APP_BASE_API_URL}/api/v1`;

export const getSongs = () =>
  axios.get(`${API_URL}/songs`).then(({ data }) => data);
