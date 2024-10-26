import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getLocalStorage, setLocalStorage, parseJwt } from "../utils";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  userId: "",
  isLoggedIn: !!getLocalStorage("e-comToken"),
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);
export const loginUser = createAsyncThunk("user/login", async (userData) => {
    try{
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/user/login`,
            userData
          );
        
          setLocalStorage("e-comToken", response?.data?.user?.token);
          const decodeToken = parseJwt(response.data.user.token);
          setLocalStorage("userId", decodeToken.id);
        
          return {
            ...response.data,
            userId: decodeToken.id,
            isLoggedIn: !!response?.data?.user?.token,
          };
    } catch(error){
        return error;
    }
  
});
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userId = action.payload.userId;
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
