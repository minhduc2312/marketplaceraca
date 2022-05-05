import { Box, Button, FormControlLabel, FormGroup, Switch, TextField, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Web3 from 'web3';
import { AppContext } from '../../context/AppContext';
import abi from 'human-standard-token-abi';
import { BSCTestNet, PancakeRouterTestnet, WrappedBNBTestnet, privateKey, ABIPancakeSwapTest, PancakeRouter, ABIPancakeSwap, BSCMainNet, WrappedBNBMainnet } from './constant';
import SwitchButtonCustom from './SwitchButtonCustom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const config = {
  testnet: {
    "PancakeRouter": PancakeRouterTestnet,
    "BSCChain": BSCTestNet,
    "WrappedBNB": WrappedBNBTestnet,
    "ABIPancakeSwap": ABIPancakeSwapTest
  },
  mainnet: {
    "PancakeRouter": PancakeRouter,
    "BSCChain": BSCMainNet,
    "WrappedBNB": WrappedBNBMainnet,
    "ABIPancakeSwap": ABIPancakeSwap
  }
}
const TESTNET = 'testnet';
const MAINNET = 'mainnet'


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
  const Web3js = useMemo(() => new Web3(new Web3.providers.HttpProvider(config[network].BSCChain)), [network])
  const spend = Web3js.utils.toChecksumAddress(config[network].WrappedBNB);
  const contract = useMemo(() => new Web3js.eth.Contract(config[network].ABIPancakeSwap, config[network].PancakeRouter, { from: currentAccount }), [network]);
  const nonce = useMemo(async () => await Web3js.eth.getTransactionCount(currentAccount));
  const getAllowance = async (tokenAddress, currentAccount) => {
    const token = new Web3js.eth.Contract(abi, tokenAddress, { from: currentAccount })
    const approvalLimit = await token.methods.allowance(currentAccount, config[network].PancakeRouter).call();
    return approvalLimit;
  }
  const handleSwitch = useCallback((event) => {
    setIsBuy(event.target.checked);
  }, [])
  const handleSwitchNetwork = useCallback((event) => {
    setSwitchNetWork(prev => !prev)
  }, [])

  const signTransaction = useCallback((txObj) => {
    Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
      if (err) {
        return err
      } else {
        toast.success("Transaction Submitted!");
        return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, hash) => {
          if (err) {
            toast.error(`${err.message} 🤯`);
          } else {
            console.log(`Transaction: ${hash}`)
            const getReceipt = new Promise(resolve => {
              const interval = setInterval(function () {
                console.log("Attempting to get transaction receipt...");
                Web3js.eth.getTransactionReceipt(hash, async function (err, res) {
                  if (res) {
                    const balance = await Web3js.eth.getBalance(currentAccount);
                    setBNBBalance(Number(Web3js.utils.fromWei(balance.toString(), 'ether')).toFixed(5))
                    clearInterval(interval);
                    return resolve(res)
                  }
                });
              }, 1000);
            })

            toast.promise(
              getReceipt,
              {
                pending: 'Transaction Pending',
                success: {
                  render({ data }) {
                    window.localStorage.setItem('private', privateKey)
                    return `Transaction Successful!!!`
                  },
                  onClick(data) {
                    const url = network === MAINNET ? `https://bscscan.com/tx/${hash}` : `https://testnet.bscscan.com/tx/${hash}`
                    window.open(url, '_blank');
                  }
                },
                error: 'Transaction Rejected 🤯'
              }
            )

          }
        })
      }
    })
  }, [])

  const getApprove = useCallback(async (tokenAddress, currentAccount, amount) => {
    const token = new Web3js.eth.Contract(abi, tokenAddress, { from: currentAccount })
    const dataApproveToken = await token.methods.approve(config[network].PancakeRouter, Web3js.utils.toWei((amount * 100).toString(), 'ether')).encodeABI();
    let txObj = {
      "gasLimit": Web3js.utils.toHex(290000),
      "gasPrice": Web3js.utils.toWei(gas.toString(), 'gwei'),
      "value": '0x00',
      "from": currentAccount,
      "data": dataApproveToken,
      "to": tokenAddress,
      // "nonce": Web3js.utils.toHex(nonce)
    }
    signTransaction(txObj)
  })
  const bound = (callback, timeout) => {
    setTimeout(callback, timeout)
  }
  const handleBuy = async () => {
    try {
      const tokenToBuy = Web3js.utils.toChecksumAddress(inputAddress)

      console.log('Start...')

      const amountIn = Web3js.utils.toWei(amount.toString(), 'ether');

      console.log('Swap...')

      const amounts = await contract.methods.getAmountsOut(amountIn, [tokenToBuy, spend]).call();
      const amountsOutMin = amounts[0] * (100 - slippage) / 100
      const pancakeswap2_tx = await contract.methods.swapExactETHForTokens(Math.floor(amountsOutMin).toString(), [spend, tokenToBuy], currentAccount, Math.floor(Date.now() / 1000) + 60 * 20).encodeABI();

      const txObj = {
        "gasLimit": Web3js.utils.toHex(290000),
        "gasPrice": Web3js.utils.toWei(gas.toString(), 'gwei'),
        "value": amounts[1],
        "from": currentAccount,
        "data": pancakeswap2_tx,
        "to": config[network].PancakeRouter,
      }

      signTransaction(txObj)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleSell = async () => {
    try {
      console.log("Start...")
      const tokenToSell = Web3js.utils.toChecksumAddress(inputAddress)
      const allowance = await getAllowance(tokenToSell, currentAccount)
      const amountIn = Web3js.utils.toWei(amount.toString(), 'ether');

      if (amount > Number(Web3js.utils.fromWei(allowance, 'ether'))) {
        await getApprove(inputAddress, currentAccount, amount);
      }

      const amounts = await contract.methods.getAmountsOut(amountIn, [tokenToSell, spend]).call();
      const amountsOutMin = amounts[1] * (100 - slippage) / 100
      const pancakeswap2_tx = await contract.methods.swapExactTokensForETH(amountIn, Math.floor(amountsOutMin).toString(), [inputAddress, spend], currentAccount, Math.floor(Date.now() / 1000) + 60 * 20).encodeABI();
      const txObj = {
        "gasLimit": Web3js.utils.toHex(500000),
        "gasPrice": Web3js.utils.toWei(gas.toString(), 'gwei'),
        "value": '0x00',
        "from": currentAccount,
        "data": pancakeswap2_tx,
        "to": config[network].PancakeRouter,
        // "nonce": Web3js.utils.toHex(nonce)
      }
      console.log('Swapping...')
      signTransaction(txObj)
    } catch (err) {
      toast.error(err.message)
    }


  }
  const handlePrivateKey = (e) => {
    setPrivateKey(e.target.value);
  }
  const handleChangeInput = (e) => {
    setInputAddress(e.target.value)
    if (e.target.value !== '') {
      try {
        const isValid = Web3js.utils.checkAddressChecksum(Web3js.utils.toChecksumAddress(e.target.value))
        if (isValid) {
          setIsValidAddress(isValid)
          setInputAddress(Web3js.utils.toChecksumAddress(e.target.value))
        }
      } catch (err) {
        setIsValidAddress(false)
      }
    } else {
      setIsValidAddress(false)
    }
  }
  const handleChangeAmount = (e) => {
    if (e.taget?.value === 0 || e.target.value === '') {
      setBNBAmount(0)
      setAmount(0)
    } else {
      e.target.value = Number(e.target.value)
      setAmount(e.target.value)
      bound(async () => {
        try {
          if (inputAddress && inputAddress !== '' && e.target.value !== '') {
            const amountIn = Web3js.utils.toWei(e.target.value.toString(), 'ether');
            const amounts = await contract.methods.getAmountsOut(amountIn, [inputAddress, spend]).call();
            setBNBAmount(Web3js.utils.fromWei(amounts[1], 'ether'))
          }

        } catch (err) {
          console.log(err)
        }
      }, 200)
    }
  }
  const handleChangeBNBAmount = (e) => {
    if (e.taget?.value === 0 || e.target.value === '') {
      setBNBAmount(0)
      setAmount(0)
    } else {
      e.target.value = Number(e.target.value)
      setBNBAmount(e.target.value)
      bound(async () => {
        try {
          if (inputAddress && inputAddress !== '' && e.target.value !== '') {
            const amountIn = Web3js.utils.toWei(e.target.value, 'ether');
            const amounts = await contract.methods.getAmountsOut(amountIn, [spend, inputAddress]).call();
            console.log(amounts)
            setAmount(Web3js.utils.fromWei(amounts[1], 'ether'))
          }

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
      const balance = await Web3js.eth.getBalance(currentAccount);
      setBNBBalance(Number(Web3js.utils.fromWei(balance.toString(), 'ether')).toFixed(5))
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
