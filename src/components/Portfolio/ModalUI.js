import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography, Modal, TextField } from '@mui/material';
import '../../styles/statwallet.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import InfoToken from './InfoToken';


export const getInfoToken = async (token) => {
    return await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${token
        }`).then(res => {
            const result = res.data.data
            return result;
        });
}
const ModalUI = ({ isOpen, setOpen }) => {
    const { currentAccount } = useContext(AppContext)
    const [tokenInput, setTokenInput] = useState('');
    const [infoCurrentToken, setInfoCurrentToken] = useState();
    const [invalidToken, setInvalidToken] = useState(false)
    const handleClose = () => {
        setOpen(false);
        setInfoCurrentToken();
    }
    const dispatch = useDispatch();
    const db = useSelector(state => state.db);
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
        setTokenInput(e.target.value.toLowerCase());
    }
    useEffect(() => {
        if (tokenInput.length === 42) {
            getInfoToken(tokenInput).then(res => {
                if (res) {
                    setInvalidToken(false)
                    setInfoCurrentToken({
                        ...res,
                        address: tokenInput
                    })
                }
            }).catch(err => setInvalidToken(true))
        }
        if (tokenInput === '') {
            setInvalidToken(false)
        }
        return () => {
            setInfoCurrentToken()
        }
    }, [tokenInput])

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
                    {infoCurrentToken && (
                        <InfoToken token={infoCurrentToken} />
                    )}
                    {invalidToken && (
                        <Typography variant="h6" color="#d42d31">Enter valid token address </Typography>
                    )}

                </Box>

            </Box>
        </Modal>
    )
}

export default ModalUI