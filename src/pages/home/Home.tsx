import { Button, Stack } from "@mui/material"
import React, {useState} from "react"
import { useDispatch,useSelector} from 'react-redux';
import Header from "../../components/header/Header"
import { InputRecado } from "../../components/inputRecado/InputRecado";
import ListaRecados from "../../components/listaRecados/ListaRecados";
import { addRecado } from "../../store/modules/recadosSlice";



export function Home() {

    const logado = sessionStorage.getItem("logado");

    const dispatch = useDispatch()
    

    return (
        <>
            <Header usuario={''}/>
            <Stack sx={{padding:2}}  direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <InputRecado usuarioLogado={logado!} />
            </Stack>
            <ListaRecados />
        </>
    )
    }

