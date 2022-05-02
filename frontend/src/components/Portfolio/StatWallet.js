import React, { useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Table, Button } from '@mui/material';
import { AppContext } from '../../context/AppContext'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
//FireBase
import { collection, query, getDocs, where, updateDoc, doc } from "firebase/firestore"
import { addToken, clearListToken, removeToken } from '../../app/actions';
import { getInfoToken } from './InfoToken'
import millify from 'millify';
import ImportTokenModal from './ImportTokenModal';
import TransactionsModal from './TransactionsModal';

const StatWallet = () => {
  const { currentAccount } = useContext(AppContext)
  const [loading, setLoading] = useState(true);
  const [listTransactions, setListTransactions] = useState({})
  const [infoTransactions, setInfoTransactions] = useState();
  const listToken = useSelector(state => state.listToken)
  const prevLength = useSelector(state => state.prevLength)
  const rpcUrl = 'https://bsc-dataseed1.binance.org:443'
  const web3 = new Web3(rpcUrl);
  const [listBalance, setListBalance] = useState([]);
  const db = useSelector(state => state.db);
  const dispatch = useDispatch();

  const getTransaction = ({ tokenName, address, id }) => {
    if (tokenName !== 'BNB') {
      axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${address}&address=${currentAccount}&page=1&offset=10000&startblock=0&endblock=999999999&sort=asc&apikey=RWBIX4SRF8ZCSSDVHIM8YGSK5V65J9UNNN`).then(async (res) => {
        const data = res.data.result;
        let totalDeposit = 0;
        let totalDepositPrice = 0;
        let totalWithdraw = 0;
        let totalWithdrawPrice = 0;
        let startTime = data[0].timeStamp - 86400;
        let endTime = data[data.length - 1].timeStamp;
        const listTransactionsTemp = {};

        listTransactionsTemp[tokenName] = []
        let hashmapPrice;
        if (id) {
          hashmapPrice = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`).then(res => {
            const hashmap = {};
            const data = res.data.prices;
            data.forEach((price) => {
              const date = new Date(price[0]).toLocaleDateString()
              hashmap[date] = price[1]
            })
            return hashmap;
          }).catch((err) => console.log(err))
        }
        data?.forEach(transaction => {
          const value = Number(Web3.utils.fromWei(transaction.value, 'ether'))
          let getDateTransaction = new Date(transaction.timeStamp * 1000).toLocaleDateString();
          const infoTransaction = {
            amount:value,
            date: getDateTransaction,
            status: transaction.from === currentAccount ? 'out' : 'in',
            
          }
          if (id) {
            let index = 1;
            while (hashmapPrice[getDateTransaction] === undefined && index <= 10) {
              getDateTransaction = new Date((transaction.timeStamp - 0 + 86400) * 1000).toLocaleDateString()
              index++;
            }
          }

          infoTransaction.price = hashmapPrice ? hashmapPrice[getDateTransaction] : 0;
          listTransactionsTemp[tokenName].push(infoTransaction)
          if (transaction.from === currentAccount) {
            totalWithdraw += value;
            if (id)
              totalWithdrawPrice += value * hashmapPrice[getDateTransaction];
          } else {
            totalDeposit += Number(Web3.utils.fromWei(transaction.value, 'ether'));
            if (id)
              totalDepositPrice += value * hashmapPrice[getDateTransaction];
          }
        })
        setListTransactions(prev => {
          return {
            ...prev,
            ...listTransactionsTemp
          }
        })
        const balance = Number(totalDeposit.toFixed(4) - totalWithdraw.toFixed(4));

        setListBalance(prev => {
          return {
            ...prev,
            [tokenName]: {
              totalWithdraw: totalWithdraw <= 0 ? totalWithdraw : Number(totalWithdraw).toFixed(4),
              totalDeposit: totalDeposit <= 0 ? totalDeposit : Number(totalDeposit).toFixed(4),
              balance: balance <= 0 ? Math.floor(balance) : balance.toFixed(4),
              totalWithdrawPrice,
              totalDepositPrice,
            }
          }
        })

      }).catch(err => {
        console.log(err)
      }).finally(() => setLoading(false))
    }
  }

  const deleteToken = async (e) => {
    let token;
    if (e.target.parentNode.dataset.token) {
      token = e.target.parentNode.dataset.token
    } else {
      token = e.target.dataset.token
    }
    const q = query(collection(db, 'users'), where('address', '==', currentAccount));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docItem) => {
      if (docItem.exists()) {
        const result = docItem.data().tokens;
        const listResult = result.filter(item => item.address !== token);
        const docRef = await doc(db, "users", docItem.id);
        await updateDoc(docRef, {
          tokens: [
            ...listResult
          ]
        }).then((res) => {
          dispatch(removeToken(token));
          setLoading(false)
        }).finally(() => setLoading(false))
      }
    })
  }
  const showDetailTransaction = (e) => {
    const tokenName = e.target.parentNode.dataset.name
    setInfoTransactions({
      tokenName,
      listTransactions: [
        ...listTransactions[tokenName]
      ]
    })
  }

  useEffect(() => {
    dispatch(clearListToken());
    if (currentAccount) {
      const getDataFireBase = async () => {
        const q = query(collection(db, "users"), where('address', '==', currentAccount));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            // dispatch(initTokens(doc.data().tokens))
            const listTokens = doc.data().tokens;
            if (listTokens.length !== 0) {
              let limit = listTokens.length >= 4 ? 4 : listTokens.length;
              let end = limit;
              let start = end - limit;
              // let flag = limit;
              const loop = setInterval(() => {
                for (let i = start; i < end; i++) {
                  setLoading(true)
                  getInfoToken(listTokens[i]?.address).then(async (res) => {
                    const token = listTokens[i].address;
                    dispatch(addToken({
                      ...res,
                      token,
                      id: listTokens[i].id
                    }))
                  })
                }
                if (end === listToken.length) {
                  clearInterval(loop)
                }
                start = end;
                if (end + limit > listTokens.length) {
                  end = listTokens.length;
                } else {
                  end += limit
                }
              }, 2000)
              setLoading(false)
            }
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
      }).finally(() => setLoading(false));
      if (listToken)
        getDataFireBase();
    }
    return () => {
      setListBalance([]);
      setLoading(true)
    }
  }, [currentAccount])
  useEffect(() => {
    if (prevLength <= listToken.length && listToken.length !== 0) {
      const length = listToken.length;
      getTransaction(listToken[length - 1]);
    }
    return () => {
      setLoading(true)
    }
  }, [listToken])
  return (
    <div className="PortfolioWallet" style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ maxWidth: '650px' }} id="PortfolioWallet-section" component={Paper}>
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
                <TableCell component='th' data-name={item.tokenName}>{item.tokenName} {listTransactions[item.tokenName] ? (<Button className='button-detail' sx={{
                  fontSize: "12px",
                  padding: 0,
                  justifyContent: "center",
                }} onClick={(e) => showDetailTransaction(e)}>Details</Button>) : ''} </TableCell>
                <TableCell align='center'>{(listBalance[item.tokenName]?.totalDeposit) ? millify(listBalance[item.tokenName]?.totalDeposit, {
                  precision: 2,
                  decimalSeparator: ","
                }) : 0} (~{listBalance[item.tokenName]?.totalDepositPrice ? millify(listBalance[item.tokenName]?.totalDepositPrice, {
                  precision: 2,
                  decimalSeparator: ","
                }) : 0})</TableCell>

                <TableCell align='center'>{(listBalance[item.tokenName]?.totalWithdraw) ? millify(listBalance[item.tokenName]?.totalWithdraw, {
                  precision: 2,
                  decimalSeparator: ","
                }) : 0} (~{listBalance[item.tokenName]?.totalWithdrawPrice ? millify(listBalance[item.tokenName]?.totalWithdrawPrice, {
                  precision: 2,
                  decimalSeparator: ","
                }) : 0})</TableCell>

                <TableCell align='center'>{(listBalance[item.tokenName]?.balance) && item.tokenName !== "BNB" ? millify(listBalance[item.tokenName]?.balance, {
                  precision: 2,
                  decimalSeparator: ","
                }) : (listBalance[item.tokenName]?.balance)}</TableCell>
                <TableCell sx={{ padding: 0, width: '20px' }} align='center'>
                  {index !== 0 && (
                    <Button sx={{ minWidth: '20px', padding: '0px' }} data-token={item.address} onClick={(e) => deleteToken(e)}><img src='/delete_outline.svg' alt='' /></Button>
                  )}
                </TableCell>
              </TableRow>
            )))}
            <TableRow >
              <TableCell colSpan={5} align='center' style={{ textAlign: 'center', padding: '10px 0' }}>
                <ImportTokenModal />
              </TableCell>
            </TableRow>
            {loading && (
              <TableRow >
                <TableCell colSpan={5} align='center' style={{ textAlign: 'center' }}>
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {infoTransactions && (
        <TransactionsModal infoTransactions={infoTransactions} setInfoTransactions={setInfoTransactions}>

        </TransactionsModal>
      )}
    </div>
  )
}
export default StatWallet