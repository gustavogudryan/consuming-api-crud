import {createSlice} from '@reduxjs/toolkit'
import { CRUDState } from '../rootReducer'


export type Recado = {
    id:number,
    titulo:string,
    descricao:string,
    userId:string,
}

export type RecadosState={
    loading:boolean,
    message:{
        type:string,
        status:number,
        text:string,
    }
    recadosList:Array<Recado>,
   
}

const initialState:RecadosState={
    loading:false,
    message:{
        type:'',
        status:200,
        text:'',
    },
   recadosList:[],

 
}

export const recadosSelectAll=(state:CRUDState)=>state.recados

const recadosSlice=createSlice({
    name:'recados',
    initialState,
    reducers:{
        setNewRecado:(state,action)=>{
            state.recadosList=[...state.recadosList,action.payload]
                    },
        apagarRecado:(state,action)=>{
            state.recadosList = state.recadosList.filter(item => item.id !== action.payload)
        },
        editarRecado:(state, action)=>{
            state.recadosList.map(item => {
                if(item.id === action.payload.id){
                    item.titulo = action.payload.titulo
                    item.descricao = action.payload.descricao
                }return('')
            })
        }
    },
    extraReducers:{}
})

export const{ setNewRecado, apagarRecado, editarRecado}=recadosSlice.actions
export default recadosSlice.reducer