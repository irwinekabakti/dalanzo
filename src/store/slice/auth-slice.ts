import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../asyncThunk/auth-thunk";
import { STATUS } from "../../utils/status";

interface AuthState {
  token: string | null;
  status: string;
  error?: string | null;
}

const initialState: AuthState = {
  token: null,
  status: STATUS.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("access_token");
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.token = action.payload.token;
        localStorage.setItem("access_token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice;
