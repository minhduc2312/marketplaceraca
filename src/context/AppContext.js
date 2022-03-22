import { createContext, useEffect, useState } from 'react'
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('');

    useEffect(() => {
        checkIfWalletConnected();
        window.ethereum?.on('accountsChanged', async () => {
            checkIfWalletConnected();
        })
    }, [])

    const checkIfWalletConnected = async () => {
        if (!window.ethereum) return setAppStatus('noMetamask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
           
            if (addressArray.length > 0) {
                //connected
                setAppStatus('connected');
                setCurrentAccount(addressArray[0]);
            } else {
                // not connected
                setAppStatus('not-connected');
            }

        } catch (err) {
            console.log(err);
            setAppStatus('error')

        }
    }

    const connectToWallet = async () => {
        if (!window.ethereum) return setAppStatus('noMetamask')

        try {
            setAppStatus('loading');
            // console.log('asdsad')
            // console.log(window.ethereum);
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            if (addressArray.length > 0) {
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
            } else {
                setAppStatus('not-connected')
            }
        } catch (err) {
            console.log(err);
            setAppStatus('error')
        }
    }

    return (
        <AppContext.Provider value={{ appStatus, currentAccount, connectToWallet }}>{children}</AppContext.Provider>
    )
}