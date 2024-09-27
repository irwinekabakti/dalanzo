import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
