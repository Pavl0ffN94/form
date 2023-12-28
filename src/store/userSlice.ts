import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "types/user-types";

const initialState:UserState = {
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    favoritColor: '',
    id: '',
    files: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state, action:PayloadAction<UserState>)=>{
            return {...state, ...action.payload}
        },
        clearUser: () => {
            return {...initialState}
        } 
    }
})

export const {setUser, clearUser} = userSlice.actions;
  
  export const userReducer = userSlice.reducer;