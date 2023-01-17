// @ts-nocheck
import React, { useState } from "react"
import { Box} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { setUserOn, User } from "../../store/modules/usuariosSlice"
import { useDispatch,useSelector} from 'react-redux';
import ButtonLogin from "../../components/buttons/ButtonLogin"
import InputForm from "../../components/inputForm/InputForm"
import { userSelectAll } from "../../store/modules/usuariosSlice";

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

export function Login(): JSX.Element {

    const dispatch=useDispatch()
    
    const usersRedux=useSelector(userSelectAll)

    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const Logar = () => {

        const usuarioLogado = usersRedux.usersList.find((user:User)=>(user.email === email && user.password === password))
console.log(usuarioLogado);

        if(!usuarioLogado){
            alert("Email ou senha incorretas")
            setEmail('')
            setPassword('')
        }else {
            const avatar=usuarioLogado?.nome?.substring(0,1)
            const usuarioOn={
                id:usuarioLogado.id,
                nome:usuarioLogado.nome,
                avatar,
            }
            
            dispatch(setUserOn(usuarioOn))
            navigate('/home')
        }
    }

    return (
        <ContainerStyle>
            <DivStyle>
                <InputForm value={email} type="text" label='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <InputForm value={password} type="password" label='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <ButtonLogin onClick={Logar} />
                <Link style={{ textDecoration: 'none', marginTop: '15px', color: '#242452'}} to={"/cadastro"}>Criar conta</Link>
            </DivStyle>
        </ContainerStyle>
    )
}