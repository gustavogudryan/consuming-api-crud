import { Button, Stack } from "@mui/material"
import React, {useState} from "react"
import { useDispatch,useSelector} from 'react-redux';
import { CRUDState } from "../../store/rootReducer"
import { Recado, setNewRecado } from "../../store/modules/recadosSlice"
import Header from "../../components/header/Header"
import InputForm from "../../components/inputForm/InputForm"
import ListaRecados from "../../components/listaRecados/ListaRecados";

export function Home() {
const dispatch=useDispatch()

const userlogado=useSelector(({usuarios}:CRUDState)=>usuarios.userOn!)

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const salvarRecado = () => {
                
        const novoRecado: Recado = { 
            id: Number(Math.floor(Math.random() * Date.now())),
            titulo: titulo,
            descricao: descricao,           
            userId:userlogado.id
        }
        setDescricao('')
        setTitulo('')
   
        dispatch(setNewRecado(novoRecado))
      }     

    return (
        <>
            <Header usuario={''}/>
            <Stack sx={{padding:2}}  direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <InputForm value={titulo} type="text" label='Titulo' onChange={(e)=>setTitulo(e.target.value)}/>
                <InputForm value={descricao} type="text" label='Descrição' onChange={(e)=>setDescricao(e.target.value)}/>
                <Button onClick={salvarRecado} variant="contained">Salvar</Button>
            </Stack>
            <ListaRecados />
        </>
    )
    }

