import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../api/axios_instance";

const initialState = {
  messages: [],
  loading_messages: false,
  loading_create: false,
};

export const fetch_messages = createAsyncThunk(
  "/fetch_messages",
  async (inputs) => {
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
      }
      const res = await AxiosInstance.get("/message/fetch_messages", data);
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const messageSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetch_messages.pending, (state) => {
      state.loading_messages = true;
    });
    builder.addCase(fetch_messages.rejected, (state) => {
      state.loading_messages = false;
    });
    builder.addCase(fetch_messages.fulfilled, (state, action) => {
      state.loading_messages = false;
      state.messages = action.payload.messages;
      console.log(state.messages);
    });
  },
});

export default messageSlice.reducer;
