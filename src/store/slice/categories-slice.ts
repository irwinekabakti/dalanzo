import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "../asyncThunk/categories-thunk";
import { STATUS } from "../../utils/status";

export interface CategoryState {
  categories: string[];
  selectedCategory: string;
  status: string;
  error?: string | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: "all",
  status: STATUS.IDLE,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice;
