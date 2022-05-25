import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'


export const selectNFTs = [
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

const SelectNFT = ({ handleChange, selectedNFT,...props }) => {
    return (
        <FormControl className='select-nft' {...props}>
            <Select
                size='small'
                labelId="select"
                id="selectedNFT"
                value={selectedNFT}
                onChange={handleChange}
                sx={{ color: '#333', fontWeight: 600 }}>

                {selectNFTs.length !== 0 && selectNFTs.map(nft => (
                    <MenuItem value={nft.id} key={nft.id}>
                        <img style={{ objectFit: 'contain' }} width='40px' height='40px' src={`${process.env.PUBLIC_URL}/raca/${nft.img}`} alt={nft.name} />
                        {nft.name}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}

export default SelectNFT