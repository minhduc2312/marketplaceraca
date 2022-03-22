import { Button, buttonGroupClasses } from '@mui/material';
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Metamask = () => {
    const { appStatus, connectToWallet, currentAccount } = useContext(AppContext);
    const app = (status = appStatus) => {
        switch (status) {
            case 'connected':
                return userLoggedIn

            case 'not-connected':
                return noUserFound

            case 'noMetamask':
                return noMetamaskFound

            case 'error':
                return error

            default:
                return loading
        }
    }

    const noUserFound = (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            /* width: 25%; */
            alignItems: 'center',
        }}>
            <img width={`100px`} height='100px' src='/marketplaceraca/metamask.png' />
            <Button sx={{ height: '100%', color: '#383838', background: '#fcc33c' }} variant="contained" onClick={() => connectToWallet()}>Connect to wallet</Button>
        </div>
    )
    const userLoggedIn = (
        <div>{currentAccount}</div>
    )
    const noMetamaskFound = (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            /* width: 25%; */
            alignItems: 'center',
        }}>
            <img width={`100px`} height='100px' src='/marketplaceraca/metamask.png' />
            <p> You must install Metamask, a <br /> virtual Ethereum wallet, in your browser</p>
        </div>

    )
    const error = (
         <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            /* width: 25%; */
            alignItems: 'center',
        }}>
            <img width={`100px`} height='100px' src='/marketplaceraca/error.png' />
            <p>An error occurred. Please try again later or use another browser</p>
        </div>
    )
    const loading = (
        <div> Loading... </div>
    )
    return (
        <div>{app(appStatus)}</div>
    )
}

export default Metamask