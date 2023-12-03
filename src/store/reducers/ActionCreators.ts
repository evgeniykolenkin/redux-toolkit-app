import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/users";

// ?это для первого случая, как в legacy без createAsyncThunk
// import { AppDispatch } from "..";
// import {
//   usersFetching,
//   usersFetchingError,
//   usersFetchingSuccess,
// } from "./UsersSlice";

// function getErrorMessage(error: unknown) {
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return String(error);
// }

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(usersFetching());
//     const response = await axios.get<User[]>(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     setTimeout(() => {
//       dispatch(usersFetchingSuccess(response.data));
//     }, 500);
//   } catch (error) {
//     setTimeout(() => {
//       dispatch(usersFetchingError(getErrorMessage(error)));
//     }, 1000);
//   }
// };

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsersThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Request failed with status code 404");
    }
  }
);
