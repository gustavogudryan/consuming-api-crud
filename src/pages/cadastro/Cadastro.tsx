// @ ts-nocheck
import React, { useEffect, useState} from "react"
import { Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import ButtonCadastro from "../../components/buttons/ButtonCadastro"
import InputForm from "../../components/inputForm/InputForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addUser, resetChangeLog } from "../../store/modules/usuariosSlice";

const ContainerStyle = styled(Box)(() => ({
    height: '100vh',
    background: '#242452',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}))

const DivStyle = styled(Box)(() => ({
    minHeight: '200px',
    width: '390px',
    background: 'aliceblue',
    boxSizing: 'border-box',
    padding: '32px',
    borderRadius: '20px', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

}))

export function Cadastro()  {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    let navigate = useNavigate()

    let changeLog = useAppSelector((state) => state.usuarios.changeLog)

    const dispatch = useAppDispatch()
    const usuarioLogado = sessionStorage.getItem("logged")

    function novoUsuario() {
        dispatch(
            addUser({
                name,
                email,
                password,
            })
        )
    }

    useEffect(()=> {
        if(usuarioLogado) navigate("/home")
    }, [])

    useEffect(()=> {
        if(changeLog) {
            dispatch(resetChangeLog())
            // navigate("/")
        }
    }, [changeLog])
    
    
    return (
        <ContainerStyle>
            <DivStyle>
                <InputForm value={name} type="text" label='Nome' onChange={(e)=>setName(e.target.value)}/>
                <InputForm value={email} type="email"  label='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <InputForm value={password} type="password" label='Senha' onChange={(e)=>setPassword(e.target.value)} />
                <InputForm value={repassword} type="password" label='Repita sua senha' onChange={(e)=>setRepassword(e.target.value)}/>
                <ButtonCadastro onClick={(e) => {
                    e.preventDefault();
                    novoUsuario();
                }}/>
                <Link style={{ textDecoration: 'none', marginTop: '15px', color: '#242452'}} to={"/"}>Já possui conta?</Link>
            </DivStyle>
        </ContainerStyle>
    )
}

