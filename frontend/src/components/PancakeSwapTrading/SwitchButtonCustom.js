import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { memo } from 'react'

const BuySellSwitch = styled(Switch)(({ content }) => ({
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
            content: content.left,
            color: '#fff',

        },
        '&:after': {
            right: 2,
            content: content.right,
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
const NetworkSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));
const SwitchButtonCustom = ({ handleSwitchBuy, handleSwitchNetwork }) => {

    return (
        <FormGroup >

            <FormControlLabel sx={[{ width: 120, margin: 0, color: '#333' },
            {
                '& .MuiTypography-root': {
                    fontWeight: 700
                },
                '& .MuiSwitch-root': {
                    // paddingLeft: 0
                }
            }]}
                control={<NetworkSwitch onChange={(event) => handleSwitchNetwork(event)} defaultChecked />}
                label='Mainnet'

            />
            <FormControlLabel sx={{ width: 120, margin: 0 }}
                control={<BuySellSwitch content={{ left: `"Buy"`, right: `"Sell"` }} onChange={(event) => handleSwitchBuy(event)} defaultChecked />}
            />
        </FormGroup>

    );
}

export default memo(SwitchButtonCustom)