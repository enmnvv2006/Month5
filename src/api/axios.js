import axios from "axios";

export const api = axios.create({
  baseURL: "http://nu.tipo.lol/",
  headers: {
    "Content-Type": "application/json",
  },
});
