import {createSlice} from '@reduxjs/toolkit';

//! Initial State
const authSlice = createSlice({
    name:"auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("userInfo")) || null,
    },
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;

        },
        logoutAction: (state, action) => {
            state.user = null;
        }
    }
});


//! Generate the reducers
const authReducer = authSlice.reducer;
export default authReducer;

//! Generate Actions
export const { loginAction, logoutAction } = authSlice.actions;
