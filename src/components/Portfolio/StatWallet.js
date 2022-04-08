import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Table, Button } from '@mui/material';
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import ModalUI, { getInfoToken } from './ModalUI';
import { useDispatch, useSelector } from 'react-redux';
//FireBase
import { collection, query, getDocs, where } from "firebase/firestore"
import { addToken, clearListToken } from '../../app/actions';
import { handleAddToken } from './ModalUI'

const StatWallet = () => {
  const { currentAccount } = useContext(AppContext)
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const listToken = useSelector(state => state.listToken)
  const rpcUrl = 'https://bsc-dataseed1.binance.org:443'
  const web3 = new Web3(rpcUrl);
  const [listBalance, setListBalance] = useState([]);
  const db = useSelector(state => state.db);
  const dispatch = useDispatch();
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

  const getTransaction = ({ tokenName, address }) => {
    if (tokenName !== 'BNB') {
      setLoading(true);
      axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${address}&address=${currentAccount}&page=1&offset=10000&startblock=0&endblock=999999999&sort=asc&apikey=RWBIX4SRF8ZCSSDVHIM8YGSK5V65J9UNNN`).then(res => {
        const data = res.data.result;
        let totalDeposit = 0;
        let totalWithdraw = 0;
        let transactionFee = 0;
        console.log(data)
        data?.forEach(transaction => {
          if (transaction.from === currentAccount) {
            totalWithdraw += Number(Web3.utils.fromWei(transaction.value, 'ether'));
          } else {
            totalDeposit += Number(Web3.utils.fromWei(transaction.value, 'ether'));
          }
          transactionFee += Number(Web3.utils.fromWei(transaction.gasPrice * transaction.gasUsed + "", 'ether'));
        })
        const balance = Number(totalDeposit.toFixed(4) - totalWithdraw.toFixed(4));
        setListBalance(prev => {
          return {
            ...prev,
            [tokenName]: {
              totalWithdraw: totalWithdraw <= 0 ? totalWithdraw : Number(totalWithdraw).toFixed(4),
              totalDeposit: totalDeposit <= 0 ? totalDeposit : Number(totalDeposit).toFixed(4),
              balance: balance <= 0 ? Math.floor(balance) : balance.toFixed(4)
            }
          }
        })

      }).then(() => {
        setLoading(false);
      }).catch(err => {
        console.log(err)
      })
    }
  }
  const handleOpen = () => {
    setIsOpenModal(prev => !prev);
  }
  useEffect(() => {
    if (currentAccount) {
      dispatch(clearListToken());
      const q = query(collection(db, "users"), where('address', '==', currentAccount));
      let i = 1

      const getDataFireBase = async () => {

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            // dispatch(initTokens(doc.data().tokens))
            const listTokens = doc.data().tokens;
            let limit = 4;
            console.log(listTokens)
            let end = limit;
            let start = end - limit;
            // let flag = limit;
            const loop = setInterval(() => {
              for (let i = start; i < end; i++) {
                getInfoToken(listTokens[i]).then(async (res) => {
                  const token = listTokens[i];
                  dispatch(addToken({
                    ...res,
                    token
                  }))
                })
                console.log(i)
              }
              start = end;
              if (end + limit > listTokens.length) {
                end = listTokens.length;
              } else {
                end += limit
              }
              // console.log(flag, listTokens.length)
              console.log(1)
            }, 1000)
            
            // doc.data().tokens.forEach((token) => {
            //   getInfoToken(token).then(async (res) => {
            //     dispatch(addToken({ ...res, token }))
            //   })
            // })
          }
        });
      }

      web3.eth.getBalance(currentAccount).then(res => {
        const balanceFromWei = Web3.utils.fromWei(res, 'ether')
        setListBalance(prev => {
          return {
            ...prev,
            'BNB': {
              balance: balanceFromWei <= 0 ? Math.abs(Number(balanceFromWei)) : Number(balanceFromWei).toFixed(5)
            }
          }
        })
      });
      if (listToken)
        getDataFireBase();

      // getBalanceOfTokens();
      // getTransactionBNB();
      // console.log(Web3.utils.fromWei("965125000000000",'ether'))
    }
    return () => {
      setListBalance([]);
    }
  }, [currentAccount])
  useEffect(() => {
    if (listToken.length !== 0) {
      setTimeout(() => {
        const length = listToken.length;
        getTransaction(listToken[length - 1]);
      }, 1000);
    }
  }, [listToken])
  return (
    <div className="PortfolioWallet" style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ maxWidth: '650px', minHeight: 150, }} id="PortfolioWallet-section" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component='th' align='center'>Token Name</TableCell>
              <TableCell align="center">Deposit</TableCell>
              <TableCell align="center">Withdraw</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listBalance && listToken && (listToken.map((item, index) => (
              <TableRow key={index}>
                <TableCell component='th'>{item.tokenName}</TableCell>
                <TableCell align='center'>{(listBalance[item.tokenName]?.totalDeposit)}</TableCell>
                <TableCell align='center'>{(listBalance[item.tokenName]?.totalWithdraw)}</TableCell>
                <TableCell align='center'>{(listBalance[item.tokenName]?.balance)}</TableCell>
                <TableCell align='center'>delete</TableCell>
              </TableRow>
            )))}
            <TableRow >
              <TableCell colSpan={4} align='center' style={{ textAlign: 'center' }}>
                <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '5px 10px' }} variant="contained" onClick={handleOpen}>Import</Button>
              </TableCell>
            </TableRow>
            {loading && (
              <TableRow >
                <TableCell colSpan={4} align='center' style={{ textAlign: 'center' }}>
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalUI isOpen={isOpenModal} setOpen={setIsOpenModal} />
    </div>
  )
}
export default StatWallet