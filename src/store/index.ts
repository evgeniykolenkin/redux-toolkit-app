import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UsersSlice";
import { postsApi } from "../services/PostsService";

const rootReducer = combineReducers({
  users: userReducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
