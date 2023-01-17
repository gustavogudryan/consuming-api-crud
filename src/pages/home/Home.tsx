import { Button, Stack } from "@mui/material"
import React, {useState} from "react"
import { useDispatch,useSelector} from 'react-redux';
import Header from "../../components/header/Header"
import InputForm from "../../components/inputForm/InputForm"
import ListaRecados from "../../components/listaRecados/ListaRecados";
import { addRecado } from "../../store/modules/recadosSlice";


interface IRecadoProps{
    usuarioLogado: string;
}

export function Home() {

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const dispatch = useDispatch()


    

    return (
        <>
            <Header usuario={''}/>
            <Stack sx={{padding:2}}  direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <InputForm value={titulo} type="text" label='Titulo' onChange={(e)=>setTitulo(e.target.value)}/>
                <InputForm value={descricao} type="text" label='Descrição' onChange={(e)=>setDescricao(e.target.value)}/>
                <Button  variant="contained">Salvar</Button>
            </Stack>
            <ListaRecados />
        </>
    )
    }

