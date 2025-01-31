import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore } from "redux-persist";
import { api } from "../Service/recipe";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const Store = configureStore({
  reducer: combineReducers({
    [api.reducerPath]: api.reducer,
  }),
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});
export const persister = persistStore(Store);

setupListeners(Store.dispatch);

export default Store;
