import { createContext, useEffect, useState } from 'react'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { ethers } from "ethers";
import { contractABI, contractAddress } from './constants'
export const AppContext = createContext();

const getEthereumProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log({
        provider, signer, transactionContract
    })
}

export const AppProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('');
    const provider = new WalletConnectProvider({
        rpc: {
            56: 'https://bsc-dataseed1.binance.org',
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
        const checkIfWalletConnected = async () => {
            if (!window?.ethereum && !currentAccount) return setAppStatus('noMetamask')
            try {
                if (currentAccount) {
                    setAppStatus('connected');
                    // getEthereumProvider()
                    const web3 = new Web3(window.ethereum);
                    const abi = contractABI;
                    const address = '0xD40C03B8680D4b6a4d78FC3C6F6A28C854e94A79';
                    const contract = new web3.eth.Contract(abi, address);
                    // const totalSupply = await contract.methods.totalSupply().call();
                    // console.log(contract.methods);
                    // console.log(contract)

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
        checkIfWalletConnected();
        window?.ethereum?.on('accountsChanged', async () => {
            checkIfWalletConnected();
        })

    }, [currentAccount])


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