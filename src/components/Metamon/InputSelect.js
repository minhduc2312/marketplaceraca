import { useState } from 'react';

import { MenuItem, FormControl, Select } from '@mui/material'

export const InputSelect = ({ getFilter }) => {
    const [value, setValue] = useState(0);
    const handleChange = (event) => {
        setValue(event.target.value);
        getFilter(event.target.value);
    };
    return (
        <FormControl style={{ margin: '20px 0' }}>
            <Select
                size='small'
                labelId="select"
                id="filter"
                value={value}
                onChange={handleChange}
                sx={{ left: '16px' }}
            >
                <MenuItem value={0}>Lowest Price</MenuItem>
                <MenuItem value={1}>Highest Level</MenuItem>
                <MenuItem value={2}>Highest Score</MenuItem>
            </Select>
        </FormControl>
    )

}