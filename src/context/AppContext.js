import { createContext, useEffect, useState } from 'react'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3"

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('');

    const provider = new WalletConnectProvider({
        rpc: {
            56: 'https://matic-mainnet.chainstacklabs.com',
            1: "https://cloudflare-eth.com",

        },
        // bridge: 'https://bridge.walletconnect.org',
        qrcodeModalOptions: {
            mobileLinks: [
                "metamask",
                "trust",
                "rainbow",
                "argent",
                "imtoken",
                "pillar",
            ],
        },
    });
   
    useEffect(() => {
        checkIfWalletConnected();
        window?.ethereum?.on('accountsChanged', async () => {
            checkIfWalletConnected();
        })
    }, [currentAccount])

    const checkIfWalletConnected = async () => {
        if (!window?.ethereum && !currentAccount) return setAppStatus('noMetamask')
        try {
            if (currentAccount) {
                setAppStatus('connected');
               
            } else {
                const addressArray = await window?.ethereum?.request({
                    method: 'eth_accounts',
                })

                if (addressArray?.length > 0) {
                    //connected
                    setAppStatus('connected');
                    setCurrentAccount(addressArray[0]);

                } else {
                    // not connected
                    setAppStatus('not-connected');
                    setCurrentAccount();
                }
            }
        } catch (err) {
            alert(err)
            console.log(err);
            setAppStatus('error')
        }
    }
    const disconnectWC = async () => {
        await provider.disconnect();
        setAppStatus('not-connected');
        setCurrentAccount();
        window.w3 = undefined;
    }
    const walletConnect = async () => {
        try {
            await provider.enable();

            //create Web3 instance
            const web3 = new Web3(provider)
            window.w3 = web3
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            setCurrentAccount(account.toLowerCase())
            console.log(account)
        } catch (err) {
            console.log(err)

        }
    }
    const connectToWallet = async () => {
        if (!window.ethereum && !currentAccount) return setAppStatus('noMetamask')

        try {
            setAppStatus('loading');
            // console.log('asdsad')
            // console.log(window.ethereum);
            const addressArray = await window?.ethereum?.request({
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
        <AppContext.Provider value={{ appStatus, currentAccount, connectToWallet, walletConnect, disconnectWC }}>{children}</AppContext.Provider>
    )
}