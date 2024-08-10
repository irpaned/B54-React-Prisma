import { createSlice } from "@reduxjs/toolkit";

interface Content {
  id : number;
  content : string;
  image : string;
  userId : number
}

export interface ProfileState {
  content: Content;
}

// DATA AWALNYA KITA BIKIN KOSONG/ ATAU SECARA DEFAULT KOSONG 
const initialState: ProfileState = {
    content: {
    id : 0,
    content : "",
    image : "",
    userId: 0,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER: (state, action: { payload: Content }) => {
      state.content = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_USER } = authSlice.actions;

export default authSlice.reducer;