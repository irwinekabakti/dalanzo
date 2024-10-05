import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfoProps } from "../../types/type";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        credentials
      );
      const { token } = loginResponse.data;

      const usersResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users`
      );
      const users: UserInfoProps[] = usersResponse.data;

      const loggedInUser = users.find(
        (user) => user.username === credentials.username
      );
      if (!loggedInUser) {
        throw new Error("User not found");
      }

      return { token, user: loggedInUser };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/*
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
*/
