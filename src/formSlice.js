import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    users: [],
    user: {
      name: "",
      age: "",
    },
  },
  reducers: {
    setUserName: (state, action) => {
      state.user.name = action.payload;
    },
    setUserAge: (state, action) => {
      state.user.age = action.payload;
    },
    CreateUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { setUserName, setUserAge, CreateUser } = formSlice.actions;
export default formSlice.reducer;
