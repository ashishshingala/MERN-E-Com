import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { getLocalStorage, setLocalStorage } from '../utils';
const initialState = {
    userInfo: null,
    loading: false,
    error: null,
    userId:'',
    isLoggedIn: !!getLocalStorage('e-comToken')
};
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData) => {
        console.log('userData', userData)
        const response = await axios.post('http://localhost:5000/api/user/register', userData);
        console.log('response', response.data.user.token)
        
        return response.data;
    }
);
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData) => {
        console.log('userData', userData)
        const response = await axios.post('http://localhost:5000/api/user/login', userData);
        console.log('response', response)
        setLocalStorage("e-comToken",response?.data?.user?.token)
        const decodeToken = parseJwt(response.data.user.token)
        console.log('decodeToken', decodeToken)
        return {...response.data,userId:decodeToken.id, isLoggedIn:!!response?.data?.user?.token};
    }
);
const userSlice = createSlice({
    name: 'user',
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
                state.isLoggedIn = action.payload.isLoggedIn
                
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;