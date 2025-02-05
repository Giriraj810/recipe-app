import { createAsyncThunk } from "@reduxjs/toolkit";
import { recipe } from "../../mock/recipe";

export const GetrecipeList = createAsyncThunk(
  `recipelist`,
  async () => {
    return recipe;
  }
);
