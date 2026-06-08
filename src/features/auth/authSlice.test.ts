import { describe, it, expect, beforeEach } from "vitest";
import authReducer, { login, logout, clearError } from "./authSlice";

interface AuthSliceState {
  user: { name: string; email: string; role: string; avatar: string } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthSliceState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

describe("authSlice reducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial state", () => {
    const state = authReducer(undefined, { type: "@@INIT" });
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it("sets loading and clears error on login.pending", () => {
    const state = authReducer(
      { ...initialState, error: "previous error" },
      { type: login.pending.type }
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("stores user and token on login.fulfilled", () => {
    const payload = {
      token: "mock-jwt-token-abc123",
      user: { name: "Admin User", email: "admin@dashboard.com", role: "admin", avatar: "" },
    };
    const state = authReducer(
      { ...initialState, isLoading: true },
      { type: login.fulfilled.type, payload }
    );
    expect(state.isLoading).toBe(false);
    expect(state.token).toBe(payload.token);
    expect(state.user).toEqual(payload.user);
  });

  it("stores the error message on login.rejected", () => {
    const state = authReducer(
      { ...initialState, isLoading: true },
      { type: login.rejected.type, payload: "Invalid email or password" }
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Invalid email or password");
  });

  it("clears the session on logout", () => {
    const loggedIn: AuthSliceState = {
      ...initialState,
      token: "token",
      user: { name: "Admin", email: "a@b.com", role: "admin", avatar: "" },
    };
    const state = authReducer(loggedIn, logout());
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it("clears only the error with clearError", () => {
    const state = authReducer(
      { ...initialState, error: "boom" },
      clearError()
    );
    expect(state.error).toBeNull();
  });
});
