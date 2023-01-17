import { combineReducers } from "@reduxjs/toolkit";
import usuarios from "./modules/usuariosSlice";
import recados from "./modules/recadosSlice";

export default combineReducers({
  usuarios,
  recados,
});


