import { useState } from 'react';

import { TextField, Box, Button } from '@mui/material'

const FilterMTM = ({ handleConfirmMTM }) => {
    const [minScore, setMinScore] = useState(300);
    const [level, setLevel] = useState(1);

    const handleMinScoreChange = (e) => {
        setMinScore(e.target.value);
    }
    const handleLevelChange = (e) => {
        setLevel(e.target.value);
    }
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center'
        }}>
            <TextField value={minScore} onChange={handleMinScoreChange} sx={{ color: '#333', width: 100, marginRight: '0.5rem' }} label="Min score" variant="standard" type='number'
            />
            <TextField value={level} onChange={handleLevelChange} sx={{ color: '#333', width: 100, marginRight: '0.5rem' }} label="Level" variant="standard" type='number'
            />
            <Button sx={{ height: '100%', color: '#383838', background: '#fcc33c' }} variant="contained" onClick={()=>handleConfirmMTM(minScore,level)}>Confirm</Button>
        </Box>
    )
}

export default FilterMTM