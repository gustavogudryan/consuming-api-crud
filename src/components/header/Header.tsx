import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import usuariosSlice, { resetLogged } from '../../store/modules/usuariosSlice';

interface HeaderProps {
  usuario: string;
}

const StyleAppBar = styled(AppBar)(() => ({
  height: '10vh',
  background: '#242452',
  justifyContent: 'center',
}))

export default function Header({ usuario }: HeaderProps) {

  const dispatch = useAppDispatch()

  function logout(){
    sessionStorage.removeItem("logado")
    dispatch(resetLogged());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyleAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bem vindo(a){usuario}!
          </Typography>
          <Link style={{ textDecoration: 'none'}} to='/'>
            <Button variant="contained" onClick={logout}>Logout</Button>
          </Link>
        </Toolbar>
      </StyleAppBar>
    </Box>
  );
}