// import {createSlice} from '@reduxjs/toolkit'
// import { CRUDState } from '../rootReducer'

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RecadosInstance } from "../../services/recados";
import Recado from "../../utils/interface/Recado";


// export type Recado = {
//     id:number,
//     titulo:string,
//     descricao:string,
//     userId:string,
// }

// export type RecadosState={
//     loading:boolean,
//     message:{
//         type:string,
//         status:number,
//         text:string,
//     }
//     recadosList:Array<Recado>,
   
// }

// const initialState:RecadosState={
//     loading:false,
//     message:{
//         type:'',
//         status:200,
//         text:'',
//     },
//    recadosList:[],

 
// }

// export const recadosSelectAll=(state:CRUDState)=>state.recados

// const recadosSlice=createSlice({
//     name:'recados',
//     initialState,
//     reducers:{
//         setNewRecado:(state,action)=>{
//             state.recadosList=[...state.recadosList,action.payload]
//                     },
//         apagarRecado:(state,action)=>{
//             state.recadosList = state.recadosList.filter(item => item.id !== action.payload)
//         },
//         editarRecado:(state, action)=>{
//             state.recadosList.map(item => {
//                 if(item.id === action.payload.id){
//                     item.titulo = action.payload.titulo
//                     item.descricao = action.payload.descricao
//                 }return('')
//             })
//         }
//     },
//     extraReducers:{}
// })

// export const{ setNewRecado, apagarRecado, editarRecado}=recadosSlice.actions
// export default recadosSlice.reducer

export const addRecado = createAsyncThunk(
    "/users/recados/add",
    async (recado: Recado) => {
      return RecadosInstance.create(recado);
    }
  );

  export const getAllUserNotes = createAsyncThunk(
    "/user/recados/getAll",
    async (loggedUser: string) => {
      return RecadosInstance.getAllUserRecados(loggedUser);
    }
  );

  export const updateRecado = createAsyncThunk(
    "/user/recados/update",
    async (novoRecado: object) => {
      return RecadosInstance.update(novoRecado);
    }
  );

  export const deleteRecado = createAsyncThunk(
    "/users/notes/delete",
    async (id: string) => {
      return RecadosInstance.delete(id);
    }
  );

  interface RecadoSliceState {
    listaRecados: Recado[];
    success: boolean;
  }
  
  const initialState: RecadoSliceState = {
    listaRecados: [],
    success: false,
  };
  
  const RecadosSlice = createSlice({
    name: "RecadosSlice",
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers(builder) {
      builder.addCase(addRecado.fulfilled, (state, action) => {
        if (action.payload.data.success) state.success = true;
      });
      builder.addCase(getAllUserNotes.fulfilled, (state, action) => {
        if (action.payload.data.success)
          state.listaRecados = action.payload.data.data;
      });
    },
  });
  
  export default RecadosSlice.reducer;
  