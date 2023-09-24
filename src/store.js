import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { _cache } from "./App";

const initialState = {
  current: [],
  loading: false,
  search: "",
};

// we create an async thunk (action) to fetch the data and cache it
export const searchAsync = createAsyncThunk(
  "giphy/search",
  (value) =>
    _cache.get(value) ||
    fetch(import.meta.env.VITE_API_URL + `&q=${value}`)
      .then(async (res) => {
        if (res.status !== 200) return;
        const { data } = await res.json();
        _cache.set(value, data);
        return data;
      })
      .catch(console.error)
);

// the extraReducers are the actions that will be dispatched by the async thunk
const searchSlice = createSlice({
  initialState,
  name: "giphy",
  extraReducers: (builder) =>
    builder
      .addCase(searchAsync.pending, (state, { meta }) => {
        state.loading = true;
        state.search = meta.arg;
      })
      .addCase(searchAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.current = payload || [];
      })
      .addCase(searchAsync.rejected, (state) => {
        state.loading = false;
      })
      .addDefaultCase((state) => state),
});

// we create the store and export it
export const store = configureStore({
  reducer: {
    giphy: searchSlice.reducer,
  },
});
