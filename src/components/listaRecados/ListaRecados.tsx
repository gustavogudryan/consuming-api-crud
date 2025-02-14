import React, {useState, useEffect} from "react"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch} from 'react-redux';
import InputForm from "../inputForm/InputForm";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Recado from "../../utils/interface/Recado";
import { useNavigate } from "react-router-dom";
import { deleteRecado, getAllUserRecados, updateRecado } from "../../store/modules/recadosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { v4 } from "uuid";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#242452',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    bgcolor: 'aliceblue',
    border: '1px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '5px',
  };


export default function ListaRecados() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const logado = sessionStorage.getItem("logado");
  const listaRecados = useAppSelector((state) => state.recados.listaRecados)

  const [updatedTitulo, setUpdatedTitulo] = useState("")
  const [updatedDescricao, setUpdatedDescricao] = useState("")

  function editRecado() {
      dispatch(updateRecado({
        id: id,
        titulo: updatedTitulo,
        descricao: updatedDescricao,
      }))
      .then(() => dispatch(getAllUserRecados(logado!)))
      .then(() => handleClose())

      setUpdatedDescricao("")
      setUpdatedTitulo("")
  }

  function deleteRecadoId(recadoId: string) {
    dispatch(deleteRecado(recadoId))
    .then(() => dispatch(getAllUserRecados(logado!)))
    .then(() => handleClose())
  }

  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState("")

  const handleClose = () => {
    setIsEdit(false);
  };
  
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Título</StyledTableCell>
            <StyledTableCell align="center">Descrição</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Ação</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {listaRecados.map((recado) => {
            return <StyledTableRow>

              <StyledTableCell align="center">{recado.titulo}</StyledTableCell>
              <StyledTableCell align="center">{recado.descricao}</StyledTableCell>

              <StyledTableCell align="center">
                <RadioGroup sx={{alignItems: 'center'}} name="use-radio-group" defaultValue="">
                    <FormControlLabel value="completo" control={<Radio color="success" />} label="Completo" />
                    <FormControlLabel value="incompleto" control={<Radio color="error" />} label="Incompleto" />
                </RadioGroup>
              </StyledTableCell>

              <StyledTableCell align="center">
                  <Button onClick={() => {
                    setId(recado.id!)
                    setIsEdit(true)
                  }} 
                  style={{marginRight: "0.5em"}} variant="contained" startIcon={<EditIcon />} color="success" >Editar</Button>
                  <Button onClick={() => deleteRecadoId(id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Excluir</Button> 
               </StyledTableCell> 

              {isEdit && id === recado.id &&(
                <>
                  <Modal
                      hideBackdrop
                      open={isEdit}
                      onClose={handleClose}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                      >
                      <Box sx={{ ...styleModal, width: 400 }}>
                          <InputForm onChange={(e) => setUpdatedTitulo(e.target.value)} type="text" label="Mudar Titulo"></InputForm>
                          <InputForm onChange={(e) => setUpdatedDescricao(e.target.value)} type="text" label="Mudar Descrição"></InputForm>
                          <div>
                            <Button onClick={() => editRecado()} variant="contained" style={{marginRight: "1em"}}>Editar</Button>
                            <Button variant="contained" onClick={handleClose}>Cancelar</Button>
                          </div>
                      </Box>
                  </Modal>
                </>
              )}

            </StyledTableRow>
          })}
        </TableBody>
    
      </Table>
    </TableContainer>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Título</StyledTableCell>
            <StyledTableCell align="center">Descrição</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Ação</StyledTableCell>
          </TableRow>
        </TableHead>

        {row.length&&(
          <TableBody>
            {row.map((recado) => {
              return <StyledTableRow>

              <StyledTableCell align="center">{recado.titulo}</StyledTableCell>
              <StyledTableCell align="center">{recado.descricao}</StyledTableCell>
  
              <StyledTableCell align="center">
                <RadioGroup sx={{alignItems: 'center'}} name="use-radio-group" defaultValue="">
                    <FormControlLabel value="completo" control={<Radio color="success" />} label="Completo" />
                    <FormControlLabel value="incompleto" control={<Radio color="error" />} label="Incompleto" />
                </RadioGroup>
              </StyledTableCell>
              
              <StyledTableCell align="center">
                  <Button onClick={() => {
                    setIsEdit(true)
                    setId(recado.id)
                  }} 
                  style={{marginRight: "0.5em"}} variant="contained" startIcon={<EditIcon />} color="success" >Editar</Button>
                  <Button onClick={() => dispatch(deleteRecado())} variant="contained" color="error" startIcon={<DeleteIcon />}>Excluir</Button>
              </StyledTableCell> */}
{/* 
              {isEdit && id === recado.id &&(
                <>
                  <Modal
                      hideBackdrop
                      open={isEdit}
                      onClose={handleClose}
                      aria-labelledby="child-modal-title"
                      aria-describedby="child-modal-description"
                      >
                      <Box sx={{ ...styleModal, width: 400 }}>
                          <InputForm onChange={(e) => setUpdatedTitulo(e.target.value)} type="text" label="Mudar Titulo"></InputForm>
                          <InputForm onChange={(e) => setUpdatedDescricao(e.target.value)} type="text" label="Mudar Descrição"></InputForm>
                          <div>
                            <Button onClick={() => {
                              dispatch(editarRecado({id: recado.id, titulo: updatedTitulo, descricao: updatedDescricao}))
                            }} variant="contained" style={{marginRight: "1em"}}>Editar</Button>
                            <Button variant="contained" onClick={handleClose}>Cancelar</Button>
                          </div>
                      </Box>
                  </Modal>
                </>
              )} */}
              {/* </StyledTableRow>
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer> */}
    </>
  );
}

