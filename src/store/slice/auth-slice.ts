import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../asyncThunk/auth-thunk";
import { STATUS } from "../../utils/status";
import { UserInfoProps } from "../../types/type";

// Define AuthState interface
interface AuthState {
  token: string | null;
  status: string;
  error?: string | null;
  userInfo: UserInfoProps | null;
}

const initialState: AuthState = {
  token: null,
  status: STATUS.IDLE,
  error: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.token = null;
      state.status = STATUS.IDLE;
      state.error = null;
      state.userInfo = null;
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
      .addCase(
        loginThunk.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: UserInfoProps }>
        ) => {
          state.status = STATUS.SUCCEEDED;
          localStorage.setItem("access_token", action.payload.token);
          state.token = action.payload.token; // Save token
          state.userInfo = action.payload.user; // Save user info
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload as string; // Handle error
      });
  },
});

export const { userLogout, setToken } = authSlice.actions;

export default authSlice;

/*
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
    userLogout: (state) => {
      state.token = null;
      state.status = STATUS.IDLE;
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

export const { userLogout, setToken } = authSlice.actions;

export default authSlice;
*/
