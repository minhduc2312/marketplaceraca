import { Box, FormControl, Grid, MenuItem, Select } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import NFTDetail from './NFTDetail';

const selectNFTs = [
    {
        name: 'Metamon',
        id: 13,
        img: 'metamon.png'
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

const SelectedItem = styled(MenuItem)(({ }) => ({
    padding: 8
}))
const TradingNFT = () => {
    const [selectedNFT, setSelectedNFT] = useState(selectNFTs[0].id);
    const [NFTListSelected, setNFTListSelected] = useState([]);

    const getNFTList = (id) => {
        axios.get(`/api/raca/market/price/${id}`).then(res => setNFTListSelected(res.data));
    }
    const handleChangeSelectedNFT = (e) => {
        setSelectedNFT(e.target.value)
    }

    useEffect(() => {
        getNFTList(selectedNFT);

        return () => {
            setNFTListSelected([])
        }
    }, [selectedNFT])



    return (
        <Box sx={[{
            '& svg': {
                color: "#333 !important"
            },
        },
        { backgroundColor: '#fff', borderRadius: '10px', padding: '20px' }
        ]} className="tradingNFT">
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
            
            <Grid className="section__listNFT" container mt={2} spacing={2} sx={{ boxShadow: 'none', justifyContent: 'center' }}>
                {NFTListSelected.length !== 0 && NFTListSelected.map((nft, index) => (
                    <Grid key={index} item xs={6} md={4} lg={2.4} >
                        <NFTDetail nft={nft} />
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}

export default TradingNFT