import { Box, Button, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../context/AppContext';

import SwitchButtonCustom from './SwitchButtonCustom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import web3Main, { web3Test } from './ConnectWeb3/web3.js'
import { MAINNET, networkUsing, TESTNET } from './constant/config';
import { signTransaction } from './action/SignTransaction';
import { buyToken } from './action/BuyToken';
import ContractPancakeSwap from './ConnectWeb3/contractPancake';
import account from './ConnectWeb3/account';
import { sellToken } from './action/SellToken';



const storage = window.localStorage.getItem('private') || ''
export const PancakeSwapTrading = () => {
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
    buyToken(inputAddress, BNBAmount, slippage, gas, network)
  }

  const handleSell = async () => {
    sellToken(inputAddress, amount, slippage, gas, network)
  }
  const handlePrivateKey = (e) => {
    setPrivateKey(e.target.value);
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
      const balance = await web3.eth.getBalance(currentAccount);
      setBNBBalance(Number(web3.utils.fromWei(balance.toString(), 'ether')).toFixed(5));
      //buyToken(tokenAddress: any, amountBNB: any, slippage: any, gasFee: any, network: any): Promise<void> import buyToken
      //buyToken('0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7', '0.01', '5', '5', TESTNET)
    }
    init();
    return () => {
    }
  }, [inputAddress, network])

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
