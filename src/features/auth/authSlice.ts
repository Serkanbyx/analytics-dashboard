import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "@/mocks/api";

interface AuthUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem("auth_token");
const storedUser = localStorage.getItem("auth_user");

const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  token: storedToken,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await mockApi.login(credentials);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
      return response;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
