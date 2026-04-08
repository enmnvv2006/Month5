import { api } from "./axios";

export const authApi = {
  register: (username, email, password) =>
    api.post("/api/auth/register/", { username, email, password }),
  login: (email, password) =>
    api.post("/api/auth/login/", { email, password }),
};
