import axios from "axios";

export const assetUrl = "http://localhost:7000/";
export const BASE_URL = (axios.defaults.baseURL =
  "http://localhost:7000/api/v1");
// export const NEW_BASE_URL = 'http://localhost:2411';
export const NEW_BASE_URL = "https://ede5-116-99-44-164.ngrok-free.app";
// export const BASE_URL_AUTH = 'http://localhost:7000/api/auth';
// export const BASE_URL_AUTH = 'http://localhost:2411/auth';

export const token = JSON.parse(localStorage.getItem("token"));
