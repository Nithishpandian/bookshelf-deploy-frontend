import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import searchService from "./searchService";

const initialState = {
  searchedBooks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// search book
export const searchBookFunc = createAsyncThunk(
  "/searchbook",
  async (bookName, thunkAPI) => {
    try {
      return await searchService.searchedAllBooks(bookName);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchedBook",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBookFunc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBookFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchedBooks = action.payload;
      })
      .addCase(searchBookFunc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.searchedBooks = null;
      });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
