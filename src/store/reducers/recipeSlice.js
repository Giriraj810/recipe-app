import { createSlice } from "@reduxjs/toolkit";
import { GetrecipeList } from "../async-actions/recipe";

const initialState = {
  recipeList: [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {}, // Add other reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(GetrecipeList.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(GetrecipeList.fulfilled, (state, action) => {
        state.recipeList = action.payload;
        state.loading = false;
      })
      .addCase(GetrecipeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
