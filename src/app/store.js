import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import searchReducer from "../features/searchbooks/searchSlice";
import bookshelfReducer from "../features/bookShelf/bookshelfSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    searchedBook: searchReducer,
    bookshelf: bookshelfReducer,
  },
});
