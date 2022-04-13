import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import InfoToken, { getInfoToken } from './InfoToken';
import ModalUI from './ModalUI';
import Loading from '../Loading'
const ImportTokenModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tokenInput, setTokenInput] = useState('');
    const [tokenQuery, setTokenQuery] = useState();
    const [invalidToken, setInvalidToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChangeInput = (e) => {
        setTokenInput(e.target.value.toLowerCase());
    }
    const handleOpen = () => {
        setIsOpenModal(prev => !prev);
    }
    
    const handleClose = () => {
        setTokenInput('');
        setTokenQuery();
    }
    useEffect(() => {
        const bounceInput = setTimeout(() => {
            if (tokenInput !== '') {
                getInfoToken(tokenInput).then(res => {
                    if (res.length !== 0 && res.length !== undefined) {
                        setInvalidToken(false)
                        setTokenQuery([...res])
                        // console.log(res?.length)
                    } else {
                        setInvalidToken(false)
                        setTokenQuery([{
                            ...res,
                            address: tokenInput
                        }])
                    }
                }).catch(err => {
                    setInvalidToken(false)
                }).finally(() => setLoading(false));
            } else {
                setInvalidToken(false)
                setLoading(false)
            }
        }, 1000)
        return () => {
            setTokenQuery()
            setLoading(true)
            clearTimeout(bounceInput)
        }
    }, [tokenInput])
    return (
        <React.StrictMode>
            <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)' }} variant="contained" onClick={handleOpen}>Import</Button>
            <ModalUI isOpen={isOpenModal} setOpen={setIsOpenModal} onClose={handleClose}>
                <Typography id="modal-modal-title" variant="h6" align='center' component="h2">
                    Import Token
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <TextField value={tokenInput} autoFocus onChange={(e) => handleChangeInput(e)} label="Token" variant="outlined" className='input-token' sx={{ mt: 2 }} />
                    {tokenQuery && <Box sx={{ mt: 2, maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }} className="list-token-query">
                        {tokenQuery.map((infoToken, index) => (
                            <InfoToken key={index} token={infoToken} setLoading={setLoading} />)
                        )}
                    </Box>}
                    {invalidToken && (
                        <Typography variant="h6" color="#d42d31">Enter valid token address </Typography>
                    )}
                </Box>
                {loading && (
                    <Loading />
                )}
            </ModalUI>
        </React.StrictMode>

    )
}

export default ImportTokenModal