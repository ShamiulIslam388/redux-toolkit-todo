import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: new Date().getTime(),
  text: "Hello toolkit",
  isCompleted: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
