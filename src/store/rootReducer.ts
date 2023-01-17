import { combineReducers } from '@reduxjs/toolkit';
import usuarios from './modules/usuariosSlice'
import recados from './modules/recadosSlice'


const reducers={
    usuarios,
    recados
}

    const combineReducer=combineReducers({
        ...reducers
    })

    export type CRUDState=ReturnType<typeof combineReducer>
    export default combineReducer

