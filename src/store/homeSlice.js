import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    watchList: JSON.parse(localStorage.getItem("watchList")) || [],
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    getWatchList: (state, action) => {
      state.watchList = action.payload;
      localStorage.setItem("watchList", JSON.stringify(action.payload));
    },
    removeFromWatchList: (state, action) => {
      const item = action.payload;
      state.watchList = state.watchList.filter((movie) => movie[0].id !== item);
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getApiConfiguration,
  getGenres,
  getWatchList,
  removeFromWatchList,
} = homeSlice.actions;

export default homeSlice.reducer;
