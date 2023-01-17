// @ ts-nocheck
import React, { useState} from "react"
import { Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { useDispatch,useSelector} from 'react-redux';
import { setNewUser, userSelectAll, UserState,User } from "../../store/modules/usuariosSlice"
import ButtonCadastro from "../../components/buttons/ButtonCadastro"
import InputForm from "../../components/inputForm/InputForm";

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

interface Recado {
    id: number,
    titulo: string,
    descricao: string,
}

interface Usuario {
    id: number,
    name?: string,
    email: string,
    password?: string,
    recados?: Array<Recado>,
}

export function Cadastro()  {
    const dispatch=useDispatch()

    const usersRedux:UserState=useSelector(userSelectAll)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    const limpaCampos = () => {
        setName('')
        setEmail('')
        setPassword('')
        setRepassword('')
    }

    const validarCampos = ():Boolean =>{

        if(!name || !email || !password || !repassword){
            alert('Preencha todos os campos!')
            limpaCampos()
            return false
        }
        if(password.length < 5 && password.length > 10){
            alert('A senha deve ter entre 5 e 10 caracteres!')
            return false
        }
        if(password !== repassword){
            alert('As senhas não conferem!')
            limpaCampos()
            return false
        }
        return true
    }

    const cadastrar = () => {
        if (validarCampos()){

            // verificando se já existe o usuario
            let checkUsuarios = usersRedux.usersList.some((user:User) => user.email === email)
            
            if (checkUsuarios){
                alert('Já existe este email em nosso sistema!')
                limpaCampos()
                return false
            }

            const newUser: Usuario = {
                id: Math.floor(Math.random() * Date.now()),
                name: name,
                email: email,
                password: password,           
            }
           
            dispatch(setNewUser(newUser))

            alert("Conta criada")
            limpaCampos()
            navigate('/')

        }
        return true
    }

    let navigate = useNavigate()
    
    return (
        <ContainerStyle>
            <DivStyle>
                <InputForm value={name} type="text" label='Nome' onChange={(e)=>setName(e.target.value)}/>
                <InputForm value={email} type="email"  label='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <InputForm value={password} type="password" label='Senha' onChange={(e)=>setPassword(e.target.value)} />
                <InputForm value={repassword} type="password" label='Repita sua senha' onChange={(e)=>setRepassword(e.target.value)}/>
                <ButtonCadastro onClick={cadastrar}/>
                <Link style={{ textDecoration: 'none', marginTop: '15px', color: '#242452'}} to={"/"}>Já possui conta?</Link>
            </DivStyle>
        </ContainerStyle>
    )
}

export type { Usuario, Recado }
