import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import Loading from '../../../helper/Loading'
import Count from './Count';
import FilterMTM from './FilterMTM';
import axios from 'axios';
import NFTDetail from './NFTDetail';
import { buyNFT } from '../buyNFT';
import BalanceRaca from './BalanceRaca';
import { useDispatch } from 'react-redux';
import { setBalanceRaca } from '../../../../app/actions';
import { getBalanceRaca } from '../getBalanceRaca';
import web3 from '../../../web3/ConnectWeb3/web3';
import { toast } from 'react-toastify';

const selectNFTs = [
    {
        name: 'Metamon',
        id: 13,
        img: 'metamon.png'
    },
    {
        name: 'Eggs',
        id: 17,
        img: 'MetamonEgg.png'
    },
    {
        name: 'Diamond Yellow',
        id: 16,
        img: 'DiamondYellow.png'
    },
    {
        name: 'Potion',
        id: 15,
        img: 'potion.png'
    },
    {
        name: 'Kiss-up State Land',
        id: 20,
        img: 'kissup.png'
    },
    {
        name: 'Musk USM Land',
        id: 7,
        img: 'mml.png'
    },
]

const listFilter = {
    order: 'fixed_price',
    minScore: 300,
    level: 1,
    minAmount: 1,
    maxAmount: 100,
}

const Marketplace = () => {
    const [selectedNFT, setSelectedNFT] = useState(selectNFTs[0].id);
    const [NFTListSelected, setNFTListSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState(listFilter);
    const [inputKey, setInputKey] = useState(JSON.parse(sessionStorage.getItem('account'))?.privateKey || '');
    const dispatch = useDispatch();

    const handleChangeSelectedNFT = (e) => {
        setSelectedNFT(e.target.value)
    }
    const handleChangeOrder = (e) => {
        setFilter(prev => {
            return {
                ...prev,
                order: e.target.value
            }
        })
    }
    const changeInputKey = (e) => {
        setInputKey(e.target.value);
    }
    const getNFTList = useCallback((filter) => {
        try {
            setIsLoading(true)
            let query ='';
            if ([13, 20, 7].includes(selectedNFT)) {
                {
                    query = 'token_standard=BEP721&'

                    if (selectedNFT === 13) {
                        query += `min_score=${filter.minScore}&max_score=650&min_level=${filter.level}&max_level=60`
                    }
                }
            } else {
                query += `token_standard=BEP1155&min_count=${filter.minAmount}&max_count=${filter.maxAmount}`
            }
            axios.get(`https://market-api.radiocaca.com/nft-sales?saleType&category=${selectedNFT}&tokenType&tokenId=-1&token_standard=${[13, 20, 7].includes(selectedNFT) ? 'BEP721' : 'BEP1155'}&pageNo=1&pageSize=20&sortBy=${filter.order}&order=asc&${query}`).then(res => {
                setNFTListSelected(res.data.list)
                setIsLoading(false)
            }).finally(() => setIsLoading(false));
        } catch (err) {
            console.log(err)
        }
    }, [filter, selectedNFT])

    const handleConfirmMTM = useCallback((minScore, level) => {

        setFilter(prev => {
            return {
                ...prev,
                minScore,
                level
            }
        })

    }, []);
    const importKey = () => {
        try {
            const account = web3.eth.accounts.privateKeyToAccount(inputKey);

            sessionStorage.setItem('account', JSON.stringify(account));
            toast.success('Imported !!!')
        } catch (err) {
            alert('Key invalid')
        }

    }
    const handleConfirmCount = (min, max) => {
        setFilter(prev => {
            return {
                ...prev,
                minAmount: min,
                maxAmount: max < min ? min : max
            }
        })
    }
    const handleBuyNFT = async (id_in_contract, totalPrice) => {
        await buyNFT(id_in_contract, totalPrice);

        setNFTListSelected(prev =>
            prev.filter(item => item.id_in_contract !== id_in_contract)
        );
        const getBalance = await getBalanceRaca();
        dispatch(setBalanceRaca(getBalance))

    }
    useEffect( () => {
        getNFTList(filter);
        return () => {
            setNFTListSelected([])
        }
    }, [getNFTList])



    return (
        <Box className="marketplace" sx={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px' }}>
            <Box className='section__selected' sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
                position: 'relative',
            }}>
                <Box className='select__head' sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TextField onChange={changeInputKey} value={inputKey} label='Input Private key' />
                        <Button onClick={importKey} sx={[
                            {
                                '&:hover': {
                                    backgroundColor: 'rgb(255 179 0)',
                                }
                            },
                            { backgroundColor: '#fcc33c', fontWeight: '700' }
                        ]}>Import</Button>
                    </Box>
                    <FormControl className='select-nft' >
                        <Select
                            size='small'
                            labelId="select"
                            id="selectedNFT"
                            value={selectedNFT}
                            onChange={handleChangeSelectedNFT}
                            sx={{ color: '#333', fontWeight: 600 }}>

                            {selectNFTs.length !== 0 && selectNFTs.map(nft => (
                                <MenuItem value={nft.id} key={nft.id}>
                                    <img style={{ objectFit: 'contain' }} width='40px' height='40px' src={`${process.env.PUBLIC_URL}/raca/${nft.img}`} alt={nft.name} />
                                    {nft.name}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <BalanceRaca />
                </Box>

                <Box className='select__filter' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '10px' }}>
                    <Box className='section__filter' sx={{ color: '#333' }}>
                        {selectedNFT === 13 && (<FilterMTM handleConfirmMTM={handleConfirmMTM} />)}
                        {[15, 16, 17].includes(selectedNFT) && (<Count handleConfirmCount={handleConfirmCount} />)}
                    </Box>
                    <FormControl className='select-order' >
                        <Select
                            size='small'
                            labelId="select"
                            id="filterOrder"
                            value={filter.order}
                            onChange={handleChangeOrder}
                            sx={{ color: '#333', fontWeight: 600 }}>

                            <MenuItem value='single_price'>
                                <Typography>Lowest Fixed</Typography>
                            </MenuItem>
                            <MenuItem value='fixed_price'>
                                <Typography>Lowest Total</Typography>
                            </MenuItem>

                        </Select>
                    </FormControl>

                </Box>

            </Box>
            <Grid className="section__listNFT" container mt={2} spacing={2} sx={{ boxShadow: 'none', justifyContent: 'center' }}>
                {NFTListSelected.length !== 0 && NFTListSelected.map((nft, index) => (
                    <Grid key={index} item xs={12} md={4} lg={3} >
                        <NFTDetail nft={nft} handleBuyNFT={handleBuyNFT} />
                    </Grid>
                ))}
            </Grid>

            {
                isLoading && (
                    <Loading />
                )
            }
        </Box>

    )
}

export default Marketplace