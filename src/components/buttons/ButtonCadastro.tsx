import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type ButtonLoginProps={
    onClick:React.MouseEventHandler<HTMLButtonElement>
}

export default function ButtonCadastro({ onClick}:ButtonLoginProps) {
    
    return (
        <Stack spacing={2} direction="column">
            <Button style={{marginTop: '12px'}}
            variant="contained"
            onClick={onClick}
            >Cadastrar
            </Button>
        </Stack>
    );
}
