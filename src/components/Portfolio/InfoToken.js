import React, { useContext, } from 'react'
import { Box, Button, Typography } from '@mui/material';
import '../../styles/statwallet.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../app/actions';
import { addDoc, collection, getDocs, where, updateDoc, doc, QuerySnapshot, query } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';
import { getInfoToken } from './ModalUI';

const InfoToken = ({ token, invalid }) => {
    const { currentAccount } = useContext(AppContext);
    const { listToken } = useSelector(state => state)
    const infoToken = listToken.find(item => {
        return item.address.toLowerCase() === token.address.toLowerCase()
    })

    console.log(token)
    const dispatch = useDispatch();
    const db = useSelector(state => state.db);

    const handleAddUserDb = () => {
        if (currentAccount) {
            getInfoToken(token.address).then((async (res) => {
                if (res) {
                    const q = query(collection(db, "users"), where('address', '==', currentAccount));
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot.empty) {
                        await addDoc(collection(db, "users"), {
                            address: currentAccount.toLowerCase(),
                            tokens: [
                                token.address.toLowerCase()
                            ]
                        });
                    } else {
                        querySnapshot.forEach(async (data) => {
                            if (!data.data().tokens.includes(token.address.toLowerCase())) {
                                const docRef = await doc(db, "users", data.id);
                                await updateDoc(docRef, {
                                    tokens: [
                                        ...data.data().tokens,
                                        token.address.toLowerCase(),
                                    ]
                                }).then(() => {
                                    dispatch(addToken(
                                        {
                                            ...res,
                                            token: token.address
                                        }))
                                });
                            } else {
                                alert('Token is exist!')
                            }
                        });
                    }
                }
            }))
        } else {
            alert('No user')
        }

    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', width: '80%', gap: '5px' }}>
                <img src='/marketplaceraca/help_outline.svg' />
                <Typography variant="h6">{token.symbol}</Typography>
                <Typography variant="h7" marginTop={'6px'}>{token.name}</Typography>
            </Box>
            <Button sx={{ height: '100%', color: '#fff', background: 'rgb(31, 199, 212)', padding: '5px 10px', width: '30%', borderRadius: 15 }} variant="contained" onClick={() => handleAddUserDb()} disabled={infoToken ? true : false}>Import</Button>
        </Box>
    )
}

export default InfoToken