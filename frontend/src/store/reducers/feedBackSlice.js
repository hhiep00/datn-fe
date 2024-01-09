import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NEW_BASE_URL, token } from "../../ultils/axiosApi";

export const getListFeedBackDataAsync = createAsyncThunk(
  "feedBacks/getAllFeedBacks",
  async () => {
    const response = await axios.get(`${NEW_BASE_URL}/feedback/list`, {
      headers: { token: token },
    });
    return response.data.data;
  }
);

export const postFeedBackDataAsync = createAsyncThunk(
  "feedBacks/postFeedBack",
  async (feedback) => {
    const response = await axios.post(`${NEW_BASE_URL}/feedback`, feedback, {
      headers: { token: token },
    });
    return response.data.data;
  }
);

const feedBacksSlice = createSlice({
  name: "feedBacks",
  initialState: {
    allFeedBacks: [],
  },
  reducers: {},
  extraReducers: {
    [getListFeedBackDataAsync.pending]: (state, action) => {
      console.log("pending");
    },
    [getListFeedBackDataAsync.fulfilled]: (state, action) => {
      console.log("success");
      state.allFeedBacks = action.payload;
    },
    [getListFeedBackDataAsync.rejected]: (state, action) => {
      console.log("error");
    },

    [postFeedBackDataAsync.pending]: (state, action) => {
      console.log("pending");
    },
    [postFeedBackDataAsync.fulfilled]: (state, action) => {
      console.log("success");
    },
    [postFeedBackDataAsync.rejected]: (state, action) => {
      console.log("error");
    },
  },
});

const feedBacksReducer = feedBacksSlice.reducer;

export const feedBacksSelector = (state) => state.feedBacksReducer.allFeedBacks;

export default feedBacksReducer;
