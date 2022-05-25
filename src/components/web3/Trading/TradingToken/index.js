import { Box, Button, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../../../context/AppContext';

import SwitchButtonCustom from './SwitchButtonCustom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import web3Main, { web3Test } from '../../web3js/ConnectWeb3/web3.js'
import { MAINNET, networkUsing, TESTNET } from '../../web3js/constant/config';

import ContractPancakeSwap from '../../web3js/ConnectWeb3/contractPancake';
import { sellToken, buyToken, signTransaction } from '../../web3js/action';
import { ListenPairCreated } from './ListenPairCreated';


const storage = window.localStorage.getItem('private') || ''
export const TradingToken = () => {
  const { currentAccount } = useContext(AppContext)
  const [inputAddress, setInputAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true)
  const [amount, setAmount] = useState(0);
  const [slippage, setSlippage] = useState(5);
  const [isBuy, setIsBuy] = useState(true);
  const [BNBBalance, setBNBBalance] = useState(0);
  const [BNBAmount, setBNBAmount] = useState(0);
  const [gas, setGas] = useState(5);
  const [privateKey, setPrivateKey] = useState(storage);
  const [switchNetWork, setSwitchNetWork] = useState(true)


  const network = useMemo(() => switchNetWork ? MAINNET : TESTNET, [switchNetWork])

  const web3 = useMemo(() => {
    return network === MAINNET ? web3Main : web3Test
  }, [network])

  const spend = useMemo(() => {
    return web3.utils.toChecksumAddress(networkUsing[network].WrappedBNB);
  }, [network])

  const handleSwitch = useCallback((event) => {
    setIsBuy(event.target.checked);
  }, [])
  const handleSwitchNetwork = useCallback((event) => {
    setSwitchNetWork(prev => !prev)
  }, [])

  const bound = (callback, timeout) => {
    setTimeout(callback, timeout)
  }


  const handleBuy = async () => {
    buyToken(inputAddress, BNBAmount, slippage, gas, network).then(res => console.log("Buy successfully"))
  }

  const handleSell = async () => {
    sellToken(inputAddress, amount, slippage, gas, network)
  }
  const handlePrivateKey = (e) => {
    setPrivateKey(e.target.value);
    try {
      if (web3.eth.accounts.privateKeyToAccount(e.target.value))
        window.localStorage.setItem('private', e.target.value)
    } catch (err) {
      console.log(err.message)
    }

  }
  const handleChangeInput = (e) => {
    setInputAddress(e.target.value)
    if (e.target.value !== '') {
      try {
        const isValid = web3.utils.checkAddressChecksum(web3.utils.toChecksumAddress(e.target.value))
        if (isValid) {
          setIsValidAddress(isValid)
          setInputAddress(web3.utils.toChecksumAddress(e.target.value))
        }
      } catch (err) {
        setIsValidAddress(false)
      }
    } else {
      setIsValidAddress(false)
    }
  }
  const handleChangeAmount = (e) => {
    if (e.target?.value <= 0 || e.target.value === '') {
      setBNBAmount(0)
      setAmount(0)
    } else {
      e.target.value = Number(e.target.value)
      setAmount(e.target.value)
      bound(async () => {
        try {
          if (inputAddress && inputAddress !== '' && e.target.value !== '') {
            const amountIn = web3.utils.toWei(e.target.value.toString(), 'ether');
            const amounts = await ContractPancakeSwap(network).methods.getAmountsOut(amountIn, [inputAddress, spend]).call();
            setBNBAmount(web3.utils.fromWei(amounts[1], 'ether'))
          }

        } catch (err) {
          console.log(err)
        }
      }, 200)
    }
  }
  const handleChangeBNBAmount = (e) => {
    if (e.target?.value <= 0 || e.target.value === '') {
      setBNBAmount(0)
      setAmount(0)
    } else {
      e.target.value = Number(e.target.value)
      setBNBAmount(e.target.value)
      bound(async () => {
        try {
          console.time();
          if (inputAddress && inputAddress !== '' && e.target.value !== '') {
            const amountIn = web3.utils.toWei(e.target.value, 'ether');
            const amounts = await ContractPancakeSwap(network).methods.getAmountsOut(amountIn, [spend, inputAddress]).call();
            setAmount(web3.utils.fromWei(amounts[1], 'ether'))
          }
          console.timeEnd();
        } catch (err) {
          console.log(err)
        }
      }, 200)
    }

  }
  const handleChangeSlippage = (e) => {
    setSlippage(e.target.value)
  }

  const handleChangeGas = (e) => {
    setGas(e.target.value)
  }

  useEffect(() => {

    const init = async () => {
      try {
        const privateKey = localStorage.getItem('private');
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        const balance = await web3.eth.getBalance(account?.address);
        setBNBBalance(Number(web3.utils.fromWei(balance.toString(), 'ether')).toFixed(5));
        const BNBOut = async () => {
          if (amount > 0) {
            const amountIn = web3.utils.toWei(amount, 'ether');
            const amounts = await ContractPancakeSwap(network).methods.getAmountsOut(amountIn, [inputAddress, spend]).call();
            setBNBAmount(web3.utils.fromWei(amounts[1], 'ether'))
          }
        }

        BNBOut();
        // ListenPairCreated();
      } catch (err) {
        console.log(err)
      }
    }
    init();
    return () => {
    }
  }, [inputAddress, network, privateKey])

  return (
    <Box justifyContent='center' display='flex'>
      <ToastContainer style={{ borderRadius: 10, right: 'unset' }} />
      <Box gap={2} display='flex' justifyContent='center' flexDirection={'column'} maxWidth='600px' backgroundColor='#fff' borderRadius='10px' p={5}>
        <Typography fontSize={24} fontWeight={700} color={'#333'}>PancakeSwap Trading</Typography>
        <TextField value={privateKey} onChange={handlePrivateKey} color='info' variant="outlined" label='Private Key' />
        <SwitchButtonCustom handleSwitchBuy={handleSwitch} handleSwitchNetwork={handleSwitchNetwork} />
        <TextField value={inputAddress} onChange={handleChangeInput} color='info' variant="outlined" label='Input Address' />
        {inputAddress !== '' && !isValidAddress && (
          <Typography color='#ff000099'>Invalid Token Address</Typography>
        )}
        <TextField inputProps={{ type: 'number', min: 0 }} value={amount} onChange={handleChangeAmount} color='info' variant="outlined" label='Amount' />
        <TextField inputProps={{ type: 'number', min: 0 }} value={BNBAmount} onChange={handleChangeBNBAmount} color='info' variant="outlined" label={`BNB Balance: ${BNBBalance}`} />
        <TextField inputProps={{ type: 'number' }} value={slippage} onChange={handleChangeSlippage} color='info' variant="outlined" label='Slippage' />
        <TextField inputProps={{ type: 'number' }} value={gas} onChange={handleChangeGas} color='info' variant="outlined" label='Gas' />

        <Button disabled={isValidAddress ? false : true} sx={isBuy ?
          {
            backgroundColor: `#42ba96`,
            '&:hover': {
              backgroundColor: '#0ac18a',
            },
          } :
          {
            backgroundColor: `#df4759`,
            '&:hover': {
              backgroundColor: '#e53045',
            },
          }
        } variant='contained' onClick={isBuy ? handleBuy : handleSell}>{isBuy ? "Buy" : "Sell"}</Button>
      </Box>
    </Box>
  )
}
