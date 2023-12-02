import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UsersSlice";

const rootReducer = combineReducers({
  users: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
