import { useState } from 'react';

import { MenuItem, FormControl, Select, TextField, Box, Button, Container } from '@mui/material'
import { handleArrange, handleFilters } from '../../app/actions';
import { useDispatch, useSelector } from 'react-redux';

export const InputSelect = ({ handleConfirm }) => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters)
    const myStorage = window.localStorage;
    const [arrange, setArrange] = useState(filters.arrange);
    const [minScore, setMinScore] = useState(filters.minScore);
    const [level, setLevel] = useState(filters.level);


    const handleLevelChange = (e) => {
        setLevel(e.target.value);
    }

    const handleMinScoreChange = (e) => {
        setMinScore(e.target.value);
    }

    const ArrangeChange = (event) => {
        setArrange(event.target.value);
        dispatch(handleArrange(event.target.value));

    };
    const ConfirmHandle = () => {
        dispatch(handleFilters({ minScore, level }));
        setArrange(0)
        handleConfirm(minScore, level);
        myStorage.setItem('metamon', JSON.stringify({
            score: minScore,
            levelMetamon: level
        }))
    }

    return (
        <Container maxWidth='lg xl' className='container' sx={{ margin: '20px 0px 0px 0px', marginTop: '20px', color: '#fff', }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center'
            }}>
                <TextField value={minScore} onChange={handleMinScoreChange} sx={{ color: '#fff', width: 100, marginRight: '0.5rem' }} id="min-score" label="Min score" variant="standard" type='number' autoComplete="new-password"
                />
                <TextField value={level} onChange={handleLevelChange} sx={{ color: '#fff', width: 100, marginRight: '0.5rem' }} id="level" label="Level" variant="standard" type='number' autoComplete="new-password"
                />
                <Button sx={{ height: '100%', color: '#383838', background: '#fcc33c' }} variant="contained" onClick={ConfirmHandle}>Confirm</Button>
            </Box>
            <Box sx={{
                textAlign: 'center',
                // transform: 'translateX(-85px)'
            }}>
                <FormControl className='select-metamon' style={{ margin: '20px 0' }}>
                    <Select
                        size='small'
                        labelId="select"
                        id="filter"
                        value={arrange}
                        onChange={ArrangeChange}
                        sx={{ color: '#fff', }}
                    >
                        <MenuItem value={0}>Lowest Price</MenuItem>
                        <MenuItem value={1}>Highest Level</MenuItem>
                        <MenuItem value={2}>Highest Score</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Container>
    )

}