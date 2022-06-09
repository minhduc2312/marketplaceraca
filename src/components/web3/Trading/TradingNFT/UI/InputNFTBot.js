import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import SelectNFT, { selectNFTs } from './SelectNFT'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startBot } from '../../../../../app/actions';

const InputNFTBot = () => {
    const [selectedNFT, setSelectedNFT] = useState(selectNFTs[0].id)
    const [fixedPrice, setFixedPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [isStart, setIsStart] = useState(false);
    const getStartBot = useSelector(state => state.startBot)
    const dispatch = useDispatch();

    const handleChangeSelect = (e) => {
        setSelectedNFT(e.target.value)
    }
    const handleChangeFixedPrice = (e) => {
        setFixedPrice(e.target.value)
    }
    const handleChangeMaxPrice = (e) => {
        setMaxPrice(e.target.value)
    }
    const handleBot = (e) => {
        try {
            const account = sessionStorage.getItem('account');
            if (!account)
                throw "Please Input Private Key"

            dispatch(startBot(!isStart))
            setIsStart(prev => !prev);
        } catch (err) {
            toast.error(err)
            console.log(err)
        }
    }
    return (
        <Box>
            <Box display='flex' alignItems={'center'} mt={1} gap={1} justifyContent='center'>
                <SelectNFT handleChange={handleChangeSelect} selectedNFT={selectedNFT} sx={{ '& img': { width: '25px' }, '& #selectedNFT': { paddingTop: 0, paddingBottom: 0 }, '& .Mui-InputBase': { minWidth: '6.5rem', maxWidth: '6.5rem' } }} />

                <TextField value={fixedPrice} onChange={handleChangeFixedPrice} type='number' label='Fixed Price' sx={{ '& input': { padding: '8.5px 14px' }, '& label': { top: '-7px' }, width: '125px' }} autoComplete='off' />

                <TextField value={maxPrice} onChange={handleChangeMaxPrice} type='number' label='Max Price' sx={{ '& input': { padding: '8.5px 14px' }, '& label': { top: '-7px' }, width: '125px' }} autoComplete='off' />

                <Button sx={{ backgroundColor: '#69d2f1', 'color': '#fff', '&:hover': { backgroundColor: '#29bfeb' } }}>
                    <img src={`${process.env.PUBLIC_URL}/add-icon.png`} />
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }} mt={1}>
                <Button className={isStart ? 'disabled' : ''} disabled={isStart ? true : false} onClick={handleBot}
                    sx={{
                        padding: '5px 10px', backgroundColor: '#20c997', color: '#fff', '&:not(.Mui-disabled):hover': { backgroundColor: '#42ba96' }
                    }}>Start</Button>
                <Button className={isStart ? '' : 'disabled'} disabled={isStart ? false : true} onClick={handleBot}
                    sx={{
                        padding: '5px 10px', backgroundColor: '#df4759', color: '#fff', '&:not(.Mui-disabled):hover': { backgroundColor: '#e31c34' },
                    }}>Stop</Button>

            </Box>
        </Box>

    )
}

export default InputNFTBot