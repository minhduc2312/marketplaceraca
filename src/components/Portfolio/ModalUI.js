import React, { useState } from 'react'
import { Box, Button, Typography, Modal, Input, TextField } from '@mui/material';
import '../../styles/statwallet.css'
import { useDispatch } from 'react-redux';
import { addToken } from '../../app/actions';
import axios from 'axios';
const ModalUI = ({ isOpen, setOpen }) => {
    const [tokenInput, setTokenInput] = useState('')
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const style = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #00000087',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
    };
    const handleChangeInput = (e) => {
        console.log(e.target.value)
        setTokenInput(e.target.value);
    }
    const handleAddToken = async () => {
        const result = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${tokenInput}`).then(res => res.data.data);
        const data = {
            ...result,
            address: tokenInput
        }
        dispatch(addToken({ ...result, tokenInput }))
    }
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style} id='modal_import'>
                <Typography id="modal-modal-title" variant="h6" align='center' component="h2">
                    Import Token
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <TextField onChange={(e) => handleChangeInput(e)} label="Token" variant="outlined" sx={{ mt: 2 }} />
                    <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '5px 10px', mt: 2, width: '40%', transform: 'translateX(calc(100px - 10%))' }} variant="contained" onClick={handleAddToken}>Comfirm</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalUI