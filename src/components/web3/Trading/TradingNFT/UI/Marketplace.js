import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import Loading from '../../../../helper/Loading'
import Count from './Count';
import FilterMTM from './FilterMTM';
import axios from 'axios';
import NFTDetail from './NFTDetail';
import { buyNFT } from '../Action/buyNFT';
import BalanceRaca from './BalanceRaca';
import { useDispatch } from 'react-redux';
import { setBalanceRaca } from '../../../../../app/actions';
import { getBalanceRaca } from '../Action/getBalanceRaca';
import web3 from '../../../web3js/ConnectWeb3/web3';
import { toast } from 'react-toastify';
import useMediaQuery from '@mui/material/useMediaQuery';
import SelectNFT, { selectNFTs } from './SelectNFT';


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
    const matches = useMediaQuery('(max-width:600px)');

    const handleChangeSelectedNFT = useCallback((e) => {
        setSelectedNFT(e.target.value)
    }, [])
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
            let query = '';
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
            axios.get(`https://market-api.radiocaca.com/nft-sales?saleType&category=${selectedNFT}&tokenType&tokenId=-1&token_standard=${[13, 20, 7].includes(selectedNFT) ? 'BEP721' : 'BEP1155'}&pageNo=1&pageSize=10&sortBy=${filter.order}&order=asc&${query}`).then(res => {
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
    const handleBuyNFT = async (e, id_in_contract, totalPrice) => {
        await buyNFT(id_in_contract, totalPrice).then(async (res) => {
            console.log(res)
            if (res) {
                const balance = await getBalanceRaca()
                dispatch(setBalanceRaca(balance))
                setNFTListSelected(prev =>
                    prev.filter(item => item.id_in_contract !== id_in_contract)
                );
                e.target.className += "disabled"
                e.target.disabled = true
            }

        });

    }
    useEffect(() => {
        getNFTList(filter);
        
        const reload = setInterval(() => {
            getNFTList(filter);
        }, 10000)
        return () => {
            setNFTListSelected([])
            clearInterval(reload)
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
                <Box className='select__head' sx={[
                    { display: 'flex', justifyContent: 'space-between', width: '100%' },
                    matches ? {
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: '10px'
                    } : {},
                ]}>
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

                    <SelectNFT selectedNFT={selectedNFT} handleChange={handleChangeSelectedNFT} />
                    <BalanceRaca />
                </Box>

                <Box className='select__filter' sx={[
                    { display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '10px' },
                    matches ? {
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } : {}
                ]}>
                    <Box className='section__filter' sx={[
                        { color: '#333' },
                        matches ? {
                            width: '100%',
                        } : {}
                    ]}>
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

export default memo(Marketplace)