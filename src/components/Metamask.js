import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Metamask = () => {
    const { appStatus, connectToWallet, currentAccount, walletConnect, disconnectWC } = useContext(AppContext);


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
            <img alt='' width={`100px`} height='100px' src='/marketplaceraca/metamask.png' />
            <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '5px 10px' }} variant="contained" onClick={() => connectToWallet()}>Connect to Wallet</Button>
            <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '5px 10px', marginTop: '10px' }} variant="contained" onClick={() => walletConnect()}>
                <img alt='' width='30px' style={{ marginRight: '5px' }} src='/marketplaceraca/wallet-connect.svg'></img>
                Wallet Connect</Button>

        </div>
    )
    const userLoggedIn = (
        <div style={{ margin: '5px 0' }}>{currentAccount}
            {window.w3 && <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '2px 10px', marginLeft: '10px' }} variant="contained" onClick={() => disconnectWC()}>
                Log out</Button>}
        </div>
    )
    const noMetamaskFound = (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            /* width: 25%; */
            alignItems: 'center',
        }}>
            <img alt='' width={`100px`} height='100px' src='/marketplaceraca/metamask.png' />
            <p> You must install Metamask, a <br /> virtual Ethereum wallet, in your browser</p>
            <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '5px 10px', marginTop: '10px' }} variant="contained" onClick={() => walletConnect()}>
                <img alt='' width='30px' style={{ marginRight: '5px' }} src='/marketplaceraca/wallet-connect.svg'></img>
                Wallet Connect</Button>

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
            <img alt='' width={`100px`} height='100px' src='/marketplaceraca/error.png' />
            <p>An error occurred. Please try again later or use another browser</p>
            {/* <p>{errLog}</p> */}
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