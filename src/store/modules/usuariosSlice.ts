import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { usersInstance } from "../../services/usuarios";
import Usuario from "../../utils/interface/Usuario";

const initialState = {
    logged: false,
    changeLog: false,
  };

export const addUser = createAsyncThunk("/users/add", async (user: Usuario) =>{
    const response = await usersInstance.create(user)
    return response.data
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
        state.logged = true
      });
      builder.addCase(addUser.fulfilled, (state, action) => {
        state.changeLog = true
      });
    },
  });
  
  export const { resetChangeLog, resetLogged, resetState} = UsuariosSlice.actions;
  
  export default UsuariosSlice.reducer;
  

