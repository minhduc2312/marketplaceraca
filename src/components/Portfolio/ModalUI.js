import React, { useState, useContext, useEffect, useRef } from 'react'
import { Box, Typography, Modal, TextField } from '@mui/material';
import '../../styles/statwallet.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import InfoToken from './InfoToken';
import { URLSearchParams } from 'url'
import Loading from '../Loading';

// export const getInfoToken = async (token) => {

//     setLoading(true)
//     return await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${token
//         }`).then(res => {
//             const result = res.data.data
//             return result;
//         }).finally(() => setLoading(false));
// }
export const getInfoToken = async (token) => {
    return await axios.get(`https://api.coingecko.com/api/v3/search?query=${token}`)
        .then(res => {
            if (res.data.coins.length !== 0) {
                const coins = res.data.coins;
                // console.log(coins)
                return coins;
            } else {
                return axios.get(`https://api.pancakeswap.info/api/v2/tokens/${token
                    }`).then(res => {
                        const result = res.data.data
                        return result;
                    });
            }
        })
        .catch(err => console.log(err));
}
const ModalUI = ({ isOpen, setOpen }) => {
    const { currentAccount } = useContext(AppContext)
    const [tokenInput, setTokenInput] = useState('');
    const [tokenQuery, setTokenQuery] = useState();
    const [invalidToken, setInvalidToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setTokenQuery();
    }

    const dispatch = useDispatch();
    const db = useSelector(state => state.db);
    const style = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -22%)',
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
                    <TextField autoFocus onChange={(e) => handleChangeInput(e)} label="Token" variant="outlined" className='input-token' sx={{ mt: 2 }} />
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
            </Box>
        </Modal>
    )
}

export default ModalUI