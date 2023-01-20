import { Button, Stack } from "@mui/material"
import React, {useEffect, useState} from "react"
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header"
import { InputRecado } from "../../components/inputRecado/InputRecado";
import ListaRecados from "../../components/listaRecados/ListaRecados";
import { useAppDispatch } from "../../store/hooks";
import { addRecado, getAllUserRecados } from "../../store/modules/recadosSlice";



export const Home = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logado = sessionStorage.getItem("logado");

    useEffect(() => {
        if(!logado) {
            navigate("/")
        } else {
            dispatch(getAllUserRecados(logado))
        }
    }, []);

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

