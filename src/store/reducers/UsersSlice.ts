import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/users";
import { fetchUsersThunk } from "./ActionCreators";

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<User[]>) {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    },

    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsersThunk.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.error = null;
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "Неизвестная ошибка";
      }
    });
  },
});

export const { usersFetching, usersFetchingError, usersFetchingSuccess } =
  usersSlice.actions;
export default usersSlice.reducer;
