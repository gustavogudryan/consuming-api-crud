import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface InputProps {
    label: string;
    type: string,
    value?: string,
    onChange:React.ChangeEventHandler<HTMLInputElement>
}

export default function InputForm({ label, type, value, onChange }: Partial<InputProps>) {
    
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
                    type={type}
                    label={label}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </Box>
    );
}
