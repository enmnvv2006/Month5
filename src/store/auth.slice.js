import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

// Helper to persist tokens when available in response data
const persistTokensFrom = (data) => {
  try {
    console.log("Response data for token extraction:", data);
    console.log("data?.token:", data?.token);
    console.log("JSON.stringify(data?.token):", JSON.stringify(data?.token));
    console.log("data?.token?.access:", data?.token?.access);

    // Extract token - could be in different formats
    let access = null;

    // If token is an object with access property
    if (data?.token?.access) {
      access = data.token.access;
      console.log("✅ Found token.access");
    }
    // If token is a string directly (the whole token object might BE the token)
    else if (typeof data?.token === "string") {
      access = data.token;
      console.log("✅ Found token as string");
    }
    // Maybe token itself IS the access token (not a container)
    else if (data?.token && typeof data.token === "object") {
      // Try to get the first string value from token object
      access = Object.values(data.token).find((v) => typeof v === "string");
      console.log(
        "✅ Found token as first string value:",
        access?.substring(0, 20),
      );
    }
    // Try other common field names
    else {
      access =
        data?.accessToken ||
        data?.access_token ||
        data?.access ||
        data?.auth_token;
      console.log("Trying other fields, access:", access);
    }

    if (access) {
      localStorage.setItem("accessToken", access);
      console.log("✅ Access token saved:", access.substring(0, 20) + "...");
    } else {
      console.warn("❌ No access token found in response");
    }
  } catch (e) {
    console.error("❌ Error persisting tokens:", e);
  }
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(username, email, password);
      const data = response.data;
      // persist tokens if backend returns them
      persistTokensFrom(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(email, password);
      const data = response.data;
      persistTokensFrom(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
