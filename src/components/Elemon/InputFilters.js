import { Button, TextField, Box, Typography, Checkbox, FormControl, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePower, handleSort, handleFilterName, handleTokenId } from '../../app/actions';

const InputFilters = () => {
    const { min, max } = useSelector(state => state.filtersElemon);
    const [minPower, setMinPower] = useState(min);
    const [maxPower, setMaxPower] = useState(max);
    const listRarity = [
        {
            rarity: 'B',
            color: '#7ebeff',
            textShadow: '0 0 6px #4553ff'
        },
        {
            rarity: 'A',
            color: '#83ffcb',
            textShadow: '0 0 6px #45ffb0'
        },
        {
            rarity: 'S',
            color: '#ff83fa',
            textShadow: '0 0 6px #ff45d4'
        },
        {
            rarity: 'SS',
            color: '#ffe283',
            textShadow: '0 0 6px #eaff45'
        },
        {
            rarity: 'SSS',
            color: '#ff8383',
            textShadow: '0 0 6px #ff2424'
        },

    ]


    const dispatch = useDispatch();
    const handleMinPower = (event) => {
        setMinPower(event.target.value);
    }
    const handleMaxPower = (event) => {
        setMaxPower(event.target.value);
    }
    const handleSortPrice = (event) => {
        dispatch(handleSort(event.target.value));
    }
    const handleName = (event) => {
        dispatch(handleFilterName(event.target.value))
    }
    const handleSubmit = () => {
        dispatch(handlePower({ minPower, maxPower }));
    }
    // const changeTokenId = (e) => {
    //     setTokenId(e.target.value)
    // }
    useEffect(() => {
        setMinPower(min)
    }, [min])
    const changeTokenId = (e) => {
        dispatch(handleTokenId(e.target?.value))
    }

    return (
        <div className="filters">
            <div className="filter-content">
                <div className="filter-top">
                    <select onChange={handleSortPrice} className="market__select">
                        <option value="0">Lowest price</option>
                        <option value="1">Highest price</option>
                        <option value="2">Lowest Point</option>
                        <option value="3">Highest Point</option>
                    </select>
                    <select onChange={e => handleName(e)} className="market__select">
                        <option value="0">Elemon name</option>
                        <option value="4">Neikoo</option>
                        <option value="8">Skurumi</option>
                        <option value="9">RusMoonch</option>
                        <option value="10">PoxArchies</option>
                        <option value="11">Legolas</option>
                        <option value="12">Mykasa</option>
                        <option value="15">Hyugar</option>
                        <option value="16">Inori</option>
                        <option value="22">Kuroo</option>
                        <option value="17">Elight</option>
                        <option value="20">Finter</option>
                        <option value="21">Ties</option>
                        <option value="26">Hoorus</option>
                        <option value="6">Raizer</option>
                        <option value="19">Scary</option>
                        <option value="13">Cokoner</option>
                    </select>
                    <Box className='filters_expand'>
                        <Box className='filter_item'>
                            <Typography variant='h5'>Rarity</Typography>
                            <Box className='item_content'>
                                <FormControl component="fieldset" className='checkbox_item'>

                                    {listRarity.length && listRarity.map(item => {
                                        <FormControlLabel
                                            value={item.rarity}
                                            control={<Checkbox />}
                                            label="End"
                                            labelPlacement="end"
                                            sx={{
                                                color: '#fff',
                                                '&.Mui-checked': {
                                                    color: '#fff',
                                                },
                                            }}

                                        />
                                    })}
                                </FormControl>

                            </Box>
                        </Box>
                        <Box className='filter_item'>
                            <Typography variant='h5'>Aura</Typography>
                        </Box>
                    </Box>
                    <input onBlur={changeTokenId} className="market__input" placeholder="Elemon Id" type='number' />

                    <Box className='filter_power'>
                        <TextField value={minPower} onChange={handleMinPower} sx={{ width: 100, marginRight: '0.5rem' }} id="min-power" label="Min" variant="standard" type='number' />
                        <TextField value={maxPower} onChange={handleMaxPower} sx={{ width: 100, marginRight: '0.5rem' }} id="max-power" label="Max" variant="standard" type='number' />
                        <Button sx={{ height: '100%', color: '#383838', background: '#fcc33c' }} variant="contained" onClick={handleSubmit}>Confirm</Button>
                    </Box>

                </div>
            </div>

        </div>
    )
};


export default InputFilters;
