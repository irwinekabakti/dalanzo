import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
