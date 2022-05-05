import { FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react'

const BuySellSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    width: 120,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        height: '100%',
        width: '100%',
        color: '#df4759',
        '&.Mui-checked': {
            transform: 'none',
            color: '#df4759'
        },
        '&.MuiSwitch-input': {
            width: '100%',
            left: 0
        },
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            fontSize: '14px',
            width: '50%',
            zIndex: 100
        },
        '&:before': {
            left: 2,
            content: `"Buy"`,
            color: '#fff',

        },
        '&:after': {
            right: 2,
            content: `"Sell"`,
            color: '#fff',

        },

    },

    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        backgroundColor: '#b4c9e7 !important',
        opacity: '1 !important',
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            fontSize: '14px',
            width: '50%',
            zIndex: 100
        },

    },
    '& .Mui-checked .MuiSwitch-thumb': {
        transform: 'translateX(-40%)',
        color: '#42ba96'
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: '55%',
        height: 24,
        borderRadius: 10,
        transform: 'translateX(40%)',
        // transition: 'left 150ms cubicBezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubicBezier(0.4, 0, 0.2, 1) 0ms',
        transitionProperty: 'left, transform',
        transitionDuration: '150ms, 150ms',
        transitionTimingFunction: 'cubicBezier(0.4, 0, 0.2, 1), cubicBezier(0.4, 0, 0.2, 1)',
        transitionDelay: '0ms, 0ms',
    },

}));

const SwitchButtonCustom = ({ handleSwitch }) => {

    return (
        <FormControlLabel sx={{ width: 120, margin: 0 }}
            control={<BuySellSwitch onChange={(event) => handleSwitch(event)}  defaultChecked />}
        />
    );
}

export default SwitchButtonCustom