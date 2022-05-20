import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import NFTDetail from './NFTDetail';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../helper/Loading';
import Count from './Count';
import FilterMTM from './FilterMTM';
import { buyNFT } from './buyNFT';
import { TrackingEvent } from './TrackingEvent';


const selectNFTs = [
    {
        name: 'Metamon',
        id: 13,
        img: 'metamon.png'
    },
    {
        name: 'Eggs',
        id: 17,
        img: 'metamonEgg.png'
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

const TradingNFT = () => {
    const [selectedNFT, setSelectedNFT] = useState(selectNFTs[0].id);
    const [NFTListSelected, setNFTListSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState(listFilter);



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
    const getNFTList = useCallback((filter) => {
        try {
            setIsLoading(true)
            let query;
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
                // setIsLoading(false)
            }).finally(() => setIsLoading(false));
        } catch (err) {
            console.log(err)
        }
    }, [filter, selectedNFT])

    const handleConfirmMTM = useCallback((minScore, level) => {
        console.log(minScore, level)
        setFilter(prev => {
            return {
                ...prev,
                minScore,
                level
            }
        })
    },[])
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
        getNFTList(filter);
    }
    useEffect(() => {
        getNFTList(filter);
        TrackingEvent()
        return () => {
            setNFTListSelected([])
        }
    }, [getNFTList])



    return (
        <Box sx={[{
            '& svg': {
                color: "#333 !important"
            },
        },
        { backgroundColor: '#fff', borderRadius: '10px', padding: '20px' }
        ]} className="tradingNFT">
            <ToastContainer position={toast.POSITION.TOP_CENTER} style={{ borderRadius: 10 }} />
            <Box className='section__selected' sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
            }}>
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
                                <img style={{ objectFit: 'contain' }} width='40px' height='40px' src={`/raca/${nft.img}`} alt={nft.name} />
                                {nft.name}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>

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
                <Box className='section__filter' sx={{ color: '#333' }}>
                    {selectedNFT === 13 && (<FilterMTM handleConfirmMTM={handleConfirmMTM} />)}
                    {[15, 16, 17].includes(selectedNFT) && (<Count handleConfirmCount={handleConfirmCount} />)}
                </Box>
            </Box>


            <Grid className="section__listNFT" container mt={2} spacing={2} sx={{ boxShadow: 'none', justifyContent: 'center' }}>
                {NFTListSelected.length !== 0 && NFTListSelected.map((nft, index) => (
                    <Grid key={index} item xs={12} md={4} lg={2.4} >
                        <NFTDetail nft={nft} handleBuyNFT={handleBuyNFT} />
                    </Grid>
                ))}
            </Grid>

            {isLoading && (
                <Loading />
            )}


        </Box>
    )
}

export default TradingNFT