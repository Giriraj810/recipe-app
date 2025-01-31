import recipe from "./recipeSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({
  recipe: recipe,
});

export default reducers;
