import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NEW_BASE_URL, token } from "../../ultils/axiosApi";

export const getListTaskDataAsync = createAsyncThunk(
  "tasks/getAllTasks",
  async () => {
    const response = await axios.get(`${NEW_BASE_URL}/task/list`, {
      headers: { token: token },
    });
    return response.data.data;
  }
);

export const postTaskDataAsync = createAsyncThunk(
  "tasks/postTask",
  async (task) => {
    const response = await axios.post(`${NEW_BASE_URL}/task`, task, {
      headers: { token: token },
    });
    return response.data.data;
  }
);

export const deleteTaskDataAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    const response = await axios.delete(`${NEW_BASE_URL}/task/${taskId}`, {
      headers: { token: token },
    });
    return response.data.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
  },
  reducers: {},
  extraReducers: {
    [getListTaskDataAsync.pending]: (state, action) => {
      console.log("pending");
    },
    [getListTaskDataAsync.fulfilled]: (state, action) => {
      console.log("success");
      state.allTasks = action.payload;
    },
    [getListTaskDataAsync.rejected]: (state, action) => {
      console.log("error");
    },

    [postTaskDataAsync.pending]: (state, action) => {
      console.log("pending");
    },
    [postTaskDataAsync.fulfilled]: (state, action) => {
      console.log("success");
      state.allTasks.push(action.payload);
    },
    [postTaskDataAsync.rejected]: (state, action) => {
      console.log("error");
    },

    [deleteTaskDataAsync.pending]: (state, action) => {
      console.log("pending");
    },
    [deleteTaskDataAsync.fulfilled]: (state, action) => {
      state.allTasks.filter((task) => task.id !== action.payload);
    },
    [deleteTaskDataAsync.rejected]: (state, action) => {
      console.log("error");
    },
  },
});

const tasksReducer = tasksSlice.reducer;

export const tasksSelector = (state) => state.tasksReducer.allTasks;

export default tasksReducer;
