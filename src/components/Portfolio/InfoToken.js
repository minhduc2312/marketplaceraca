import React, { useContext, } from 'react'
import { Box, Button, Typography } from '@mui/material';
import '../../styles/statwallet.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../app/actions';
import { addDoc, collection, getDocs, where, updateDoc, doc, query } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';
import { getInfoToken } from './ModalUI';
import axios from 'axios';

const InfoToken = ({ token, setLoading }) => {
    const { currentAccount } = useContext(AppContext);
    const { listToken } = useSelector(state => state)
    const infoToken = listToken.find(item => {
        return item.tokenName?.toLowerCase() === token.symbol?.toLowerCase()
    })

    const dispatch = useDispatch();
    const db = useSelector(state => state.db);
    const addTokenToDB = async (token) => {
        setLoading(true)
        const q = query(collection(db, "users"), where('address', '==', currentAccount));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            await addDoc(collection(db, "users"), {
                address: currentAccount.toLowerCase(),
                tokens: [
                    {
                        address: token.address.toLowerCase(),
                        timestamp: Date.now(),
                        id: token.id
                    }
                ]
            }).finally(() => setLoading(false));
        } else {
            querySnapshot.forEach(async (data) => {
                if (!data.data().tokens.includes(token.address?.toLowerCase())) {
                    const docRef = await doc(db, "users", data.id);
                    await updateDoc(docRef, {
                        tokens: [
                            ...data.data().tokens,
                            {
                                address: token.address.toLowerCase(),
                                timestamp: Date.now(),
                                id:token.id
                            }
                        ]
                    }).then(() => {
                        console.log(token)
                        dispatch(addToken(
                            {
                                ...token,
                                token: token.address.toLowerCase(),
                                id: token.id
                            }))
                    }).finally(() => setLoading(false));
                } else {
                    alert('Token is exist!')
                }
            });
        }
    }
    const handleAddUserDb = () => {
        setLoading(true)
        if (currentAccount) {
            if (!token.address) {
                axios.get(`https://api.coingecko.com/api/v3/coins/${token.id}`).then(res => {
                    const data = res.data;
                    const address = data.platforms['binance-smart-chain']
                    if (address) {
                        getInfoToken(address).then((async (res) => {
                            if (res) {
                                console.log(token.id)
                                addTokenToDB({ ...res, address: address, id: token.id })
                            }
                        }))
                    }
                }).finally(() => setLoading(false))
            } else {
                getInfoToken(token.address).then((async (res) => {
                    if (res) {
                        addTokenToDB({
                            ...res, address: token.address, id: res.id
                        })
                    }
                })).finally(() => setLoading(false))
            }
        } else {
            alert('No user')
        }

    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', width: '80%', gap: '5px', alignItems: 'center' }}>
                <img alt='' width={'25px'} src={token.thumb ? token.large : '/marketplaceraca/help_outline.svg'} />
                <Typography variant="h6">{token.symbol}</Typography>
                <Typography variant="h7">{token.name}</Typography>
            </Box>
            <Button sx={{ height: '100%', color: '#fff', background: 'rgb(31, 199, 212)', padding: '5px 10px', width: '30%', borderRadius: 15 }} variant="contained" onClick={() => handleAddUserDb()} disabled={infoToken ? true : false}>Import</Button>
        </Box>
    )
}

export default InfoToken