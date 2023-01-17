import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RecadosInstance } from "../../services/recados";
import Recado from "../../utils/interface/Recado";


export const addRecado = createAsyncThunk(
    "/users/recados/add",
    async (recado: Recado) => {
      return RecadosInstance.create(recado);
    }
  );

  export const getAllUserRecados = createAsyncThunk(
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
      builder.addCase(getAllUserRecados.fulfilled, (state, action) => {
        if (action.payload.data.success)
          state.listaRecados = action.payload.data.data;
      });
    },
  });
  
  export default RecadosSlice.reducer;
  