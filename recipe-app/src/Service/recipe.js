import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./api/ApiUrls";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
console.log(result.error);
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "apiOne",
  tagTypes: ["Recipelist", "Recipe"],
  endpoints: (build) => ({
    getRecipes: build.query({
      query: ({ start, end, mealType, search, health, diet }) =>
        `?q=${search ? search : "all"}&app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&from=${start}&to=${end}${
          mealType ? `&mealType=${mealType}` : ""
        }${health ? `&health=${health}` : ""}${diet ? `&health=${diet}` : ""}`,
    }),
//Not Used 
    getRecipe: build.query({
      query: (id) => `recipes/${id}`, 
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Recipe", id }],
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeQuery } = api;
