import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookshelfService from "./bookshelfService";

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// search book
export const getAllBooksFunc = createAsyncThunk(
  "/searchbook",
  async (_, thunkAPI) => {
    try {
      return await bookshelfService.getAllBooks();
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
  name: "bookshelf",
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
      .addCase(getAllBooksFunc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooksFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getAllBooksFunc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.books = null;
      });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
