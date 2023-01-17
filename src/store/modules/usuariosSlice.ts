// import {createSlice} from '@reduxjs/toolkit'
// import { CRUDState } from '../rootReducer'

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersInstance } from "../../services/usuarios";
import Usuario from "../../utils/interface/Usuario";


// export type User = {
//     id:string,
//     nome:string,
//     email:string,
//     password:string,
// }
// export type UserLogado = {
//     id:string,
//     nome:string,
//     avatar:string,
// }

// export type UserState={
//     loading:boolean,
//     message:{
//         type:string,
//         status:number,
//         text:string,
//     }
//     usersList:Array<User>,
//     userOn:UserLogado|null
// }

// const initialState:UserState={
//     loading:false,
//     message:{
//         type:'',
//         status:200,
//         text:'',
//     },
//     usersList:[],
//     userOn:null
// }

// export const userSelectAll=(state:CRUDState)=>state.usuarios

// const userSlice=createSlice({
//     name:'usuarios',
//     initialState,
//     reducers:{
//         setNewUser:(state,action)=>{
//             state.usersList=[...state.usersList,action.payload]
//                     },
//         setUserOn:(state,action)=>{
//             state.userOn=action.payload
//         },
//         setUserOff:(state)=>{
//             state.userOn=null
//     },
// },
//     extraReducers:{}
// })

// export const{setNewUser,setUserOn,setUserOff}=userSlice.actions
// export default userSlice.reducer

const initialState = {
    logged: false,
    changeLog: false,
  };

export const addUser = createAsyncThunk("/users/add", async (user: Usuario) =>{
    return usersInstance.create(user)
})

export const loginUser = createAsyncThunk("/users/login", async (loginInfo: object) => {
    return usersInstance.login(loginInfo)
})

const UsuariosSlice = createSlice({
    name: "UsuariosSlice",
    initialState,
    reducers: {
      resetState: () => initialState,
      resetLogged: (state) => {
        state.logged = false;
      },
      resetChangeLog: (state) => {
        state.changeLog = false;
      },
    },
    extraReducers(builder) {
      builder.addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.logged = true;
        }
      });
      builder.addCase(addUser.fulfilled, (state, action) => {
        if (action.payload.data.success) {
          state.changeLog = true;
        }
      });
    },
  });
  
  export const { resetChangeLog, resetLogged, resetState } = UsuariosSlice.actions;
  
  export default UsuariosSlice.reducer;
  

