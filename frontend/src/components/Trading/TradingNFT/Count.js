import { useState } from 'react';

import { TextField, Box, Button } from '@mui/material'

const Count = ({ handleConfirmCount }) => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);

    const handleChangeMin = (e) => {
        setMin(e.target.value)
    }
    const handleChangeMax = (e) => {
        setMax(e.target.value)
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center'
            }}>
                <TextField value={min} onChange={handleChangeMin} sx={{ color: '#333', width: 100, marginRight: '0.5rem' }} label="Min" variant="standard" type='number' 
                />
                <TextField value={max} onChange={handleChangeMax} sx={{ color: '#333', width: 100, marginRight: '0.5rem' }}  label="Max" variant="standard" type='number' 
                />
                <Button sx={{ height: '100%', color: '#383838', background: '#fcc33c' }} variant="contained" onClick={()=>handleConfirmCount(min,max)}>Confirm</Button>
            </Box>
        </Box>
    )
}

export default Count