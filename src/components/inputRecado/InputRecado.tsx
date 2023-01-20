
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react"
import { useAppDispatch } from '../../store/hooks';
import { addRecado, getAllUserRecados } from '../../store/modules/recadosSlice';

interface InputRecadoProps {
    usuarioLogado: string;
}

export const InputRecado: React.FC<InputRecadoProps> = ({usuarioLogado}) =>{
    
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const dispatch = useAppDispatch();

    function addNovoRecado() {
        dispatch(addRecado({titulo, descricao, userEmail: usuarioLogado})).then(
            () => {
                dispatch(getAllUserRecados(usuarioLogado))
                setTitulo("")
                setDescricao("")
            }
        )
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    type="text"
                    label="Titulo"
                    value={titulo}
                    onChange={(e)=>setTitulo(e.target.value)}
                />
                <TextField
                    type="text"
                    label="Descrição"
                    value={descricao}
                    onChange={(e)=>setDescricao(e.target.value)}
                />
                <Button onClick={addNovoRecado} variant="contained">Salvar</Button>
            </div>
        </Box>
        
    );
}