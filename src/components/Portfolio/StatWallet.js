import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Table } from '@mui/material';

import { AppContext } from '../../context/AppContext'
import axios from 'axios';

const StatWallet = () => {
  const { currentAccount } = useContext(AppContext)
  const [loading, setLoading] = useState(true);
  const rpcUrl = 'https://bsc-dataseed1.binance.org:443'
  const web3 = new Web3(rpcUrl);
  const [listBalance, setListBalance] = useState([]);
  const listToken = [
    {
      tokenName: 'BNB',
      address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
    },
    {
      tokenName: "BUSD",
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    {
      tokenName: "RACA",
      address: '0x12BB890508c125661E03b09EC06E404bc9289040',
    },
    {
      tokenName: "ELMON",
      address: '0xE3233fdb23F1c27aB37Bd66A19a1f1762fCf5f3F',
    },
    {
      tokenName: "ELCOIN",
      address: '0x092FFBc968203B652B08361aDec75E275573F2db',
    }
  ]
  const abiJson = [
    {
      "constant": true,
      "inputs": [{ "name": "who", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "", "type": "uint256" }],
      "payable": false, "stateMutability": "view",
      "type": "function"
    },
  ];

  const getBalanceOfTokens = async () => {
    setLoading(true);
    listToken.map(async ({ tokenName, address }) => {
      if (tokenName !== 'BNB') {
        const contract = new web3.eth.Contract(abiJson, address);
        const balance = await contract.methods.balanceOf(currentAccount).call();
        const balanceFromWei = Web3.utils.fromWei(balance, 'ether');

        setListBalance(prev => {
          return {
            ...prev,
            [tokenName]: balanceFromWei < 0 ? balanceFromWei : Number(balanceFromWei).toFixed(5)
          }
        })
      }
    })

    setLoading(false);

  }
  const getTransaction = (token)=>{
    axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${token}&address=${currentAccount}&page=1&offset=10000&startblock=0&endblock=999999999&sort=asc&apikey=RWBIX4SRF8ZCSSDVHIM8YGSK5V65J9UNNN`).then(res=>{

      const data = res.data.result;
      const totalDeposit = 0;
      const totalWithDraw = 0;


    })
  }
  useEffect(() => {
    if (currentAccount) {
      web3.eth.getBalance(currentAccount).then(res => {
        const balanceFromWei = Web3.utils.fromWei(res, 'ether')
        setListBalance(prev => {
          return {
            ...prev,
            'BNB': balanceFromWei < 0 ? balanceFromWei : Number(balanceFromWei).toFixed(5)
          }
        })
      });
      getBalanceOfTokens();
      getTransaction('0x12BB890508c125661E03b09EC06E404bc9289040');
      // console.log(Web3.utils.fromWei("965125000000000",'ether'))
    }
    return () => {
      setListBalance([])
    }
  }, [currentAccount])

  return (
    <div className="PortfolioWallet" style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ maxWidth: '650px', minHeight: 150, }} id="PortfolioWallet-section" component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component='th' align='center'>Token Name</TableCell>
              <TableCell align="center">Deposit</TableCell>
              <TableCell align="center">Withdraw</TableCell>
              <TableCell align="center">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listBalance && (listToken.map((item, index) => (
              <TableRow key={index}>
                <TableCell component='th'>{item.tokenName}</TableCell>

                <TableCell>
                </TableCell>

                <TableCell>
                </TableCell>

                <TableCell align='center'>{(listBalance[item.tokenName])}</TableCell>

              </TableRow>
            )))}
            <TableRow >
              <TableCell colSpan={2} align='center' id='loading' style={{ textAlign: 'center' }}>
                {loading && <CircularProgress color="primary" />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default StatWallet