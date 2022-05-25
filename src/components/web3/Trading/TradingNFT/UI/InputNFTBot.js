import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import SelectNFT, { selectNFTs } from './SelectNFT'
const InputNFTBot = () => {
    const [selectedNFT, setSelectedNFT] = useState(selectNFTs[0].id)
    const handleChangeSelect = (e) => {
        setSelectedNFT(e.target.value)
    }
    return (
        <Box display='flex' alignItems={'center'} mt={1} gap={1}>
            <SelectNFT handleChange={handleChangeSelect} selectedNFT={selectedNFT} sx={{ '& img': { width: '25px' }, '& #selectedNFT': { paddingTop: 0, paddingBottom: 0 }, '& .Mui-InputBase': { minWidth: '6.5rem', maxWidth: '6.5rem' } }} />
            <TextField type='number' label='Fixed Price' sx={{ '& input': { padding: '8.5px 14px' }, '& label': { top: '-7px' }, width: '125px' }} autoComplete='off'/>
            <TextField type='number' label='Max Price' sx={{ '& input': { padding: '8.5px 14px' }, '& label': { top: '-7px' }, width: '125px' }} autoComplete='off'/>
            <Button sx={{ backgroundColor: '#69d2f1', 'color': '#fff', '&:hover': { backgroundColor: '#29bfeb' } }}>
            <img src="https://img.icons8.com/external-bearicons-blue-bearicons/16/000000/external-plus-essential-collection-bearicons-blue-bearicons.png"/>
            </Button>
        </Box>
    )
}

export default InputNFTBot