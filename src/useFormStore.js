import { create } from "zustand";

export const useFormStore = create((set) => ({
  users: [],
  user: {
    name: "",
    age: "",
  },
  setUserName: (name) =>
    set((state) => ({ ...state, user: { ...state.user, name } })),
  setUserAge: (age) =>
    set((state) => ({ ...state, user: { ...state.user, age } })),
  createUser: (user) =>
    set((state) => ({ ...state, users: [...state.users, user] })),
}));
