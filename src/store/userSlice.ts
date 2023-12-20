import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



export enum FavoritColor {
balck ='black',
white = 'white',
red= 'red',
yelow='yelow'
}

export type User ={
    firstName:string,
    lastName:string,
    sex: string,
    age:number,
    favoritColor:FavoritColor,
    id: string,
}

const usersAdapter = createEntityAdapter({
selectId:(user:User)=> user.id,
sortComparer:(a,b)=> a.firstName.localeCompare(b.firstName)
});

const usersSlice = createSlice({
    name: 'Users',
    initialState:{...usersAdapter.getInitialState(), 
    currentUser: null
    },
    reducers: {
        addUser: usersAdapter.addOne,
        removeUser: usersAdapter.removeOne,
        updateUser: usersAdapter.updateOne,
        setCurrentUser: (state, action:PayloadAction<User>) =>{
            state.currentUser = action.payload.id
        }
    }
})

export const {
    addUser,
    removeUser,
    updateUser,
    setCurrentUser,
  } = usersSlice.actions;

  export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
  } = usersAdapter.getSelectors((state) => state.users);
  
  
  export const selectCurrentUser = (state) => state.users.currentUser;
  
  export const usersReducer = usersSlice.reducer;