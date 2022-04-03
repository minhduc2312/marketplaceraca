import React, { useContext, useEffect, useState } from 'react'
import Metamask from './Metamask'
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Table } from '@mui/material';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { numberWithCommas } from './NFTs/NFTs';
import '../styles/market_history.css'


const MarketHistory = () => {
  const { currentAccount } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const [historyList, setHistoryList] = useState([]);
  const [length, setLength] = useState(0);
  const [totalList, setTotalList] = useState([])
  const [totalBuy, setTotalBuy] = useState('');
  const [totalSell, setTotalSell] = useState('');
  const getMarketHistory = (pageNo, pageSize) => {
    return axios(`https://market-api.radiocaca.com/users/${currentAccount}/histories?pageNo=${pageNo}&pageSize=${pageSize}`).then(res => res.data)
  }
  useEffect(() => {
    console.log(window.w3)
    const getHistoryData = async () => {
      let pageNo = 1;
      let pageSize = 10;
      const isMD = currentAccount.toLowerCase() === '0x769ba0cb0d89666f7506194d2cf416ea0f812e16';
      if (isMD) {
        getMarketHistory(pageNo, pageSize).then(async (res) => {
          setLength(res.total)
          const listDataMD = await getMarketHistory(1, res.total - 8).then(async (res) => {
            const listDataMD2 = await getMarketHistory(2, res.total - 7).then(res => res.list);

            return res.list.concat(listDataMD2)
          });
          setHistoryList(listDataMD)

        })
      } else {
        const listData = await getMarketHistory(pageNo, pageSize).then(async (res) => {
          setLength(res.total);
          return getMarketHistory(pageNo, res.total).then(res => res.list);
        })
        setHistoryList(listData);
      }

    }

    if (currentAccount) {
      setLoading(true)
      getHistoryData();
    }
    return () => {
      setHistoryList([])
    }
  }, [currentAccount])

  useEffect(() => {

    const listNFT = [];
    const listTotal = [];
    let buy = 0;
    let sell = 0;
    let lengthList = length;
    if (currentAccount === '0x769ba0cb0d89666f7506194d2cf416ea0f812e16') {
      lengthList--;
    }
    if (historyList.length === lengthList && historyList.length !== 0) {
      historyList.forEach(item => {
        if (item.token_name === 'Metamon#363811')
          return;
        if (!listNFT.includes(item.token_name)) {
          listNFT.push(item.token_name)
          listTotal.push({
            token_name: item.token_name,
            totalBuy: item.type === 'Buy' ? item.amount : 0,
            totalSell: item.type === 'Sell' ? item.amount - item.fee : 0,
            countBuy: item.type === 'Buy' ? item.count : 0,
            countSell: item.type === 'Sell' ? item.count : 0,
          })
        } else {
          if (item.type === 'Buy') {
            listTotal.filter(name => name.token_name === item.token_name)[0].totalBuy += item.amount;
            listTotal.filter(name => name.token_name === item.token_name)[0].countBuy += item.count;
          }
          else {
            listTotal.filter(name => name.token_name === item.token_name)[0].totalSell += item.amount - item.fee
            listTotal.filter(name => name.token_name === item.token_name)[0].countSell += item.count
          }
        }
        if (item.type === 'Buy') {
          buy += item.amount
        }
        else {
          sell += item.amount - item.fee
        }
      })
      setTotalBuy(buy);
      setTotalSell(sell);
      // console.log(listTotal.filter(name => name.token_name === "Metamon Egg#204900010231")[0]?.totalSell)
      if (currentAccount === '0x769ba0cb0d89666f7506194d2cf416ea0f812e16') {
        const getItem = listTotal.filter(name => name.token_name === "Metamon Egg#204900010231")[0];
        getItem.totalSell = 100000;
        setTotalSell(prev => prev + getItem.totalSell)
      }

      setTotalList(listTotal.map(item => {
        return {
          ...item,
          profit: item.totalSell - item.totalBuy
        }
      }))
      setLoading(false);
    }

  }, [historyList])

  return (
    <div>
      <Metamask />
      {currentAccount && (
        <div className="sales">
          <TableContainer id="sales-section" component={Paper}>
            <Table sx={{ minWidth: 650, minHeight: 150 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component='th' align='center'>NFT</TableCell>
                  <TableCell component='th' align="center">
                    <div>
                      <p colSpan={2}>Buy</p>
                      <div className='multiRow'>
                        <p>Amount</p>
                        <p>Count</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <p>Sell</p>
                      <div className='multiRow'>
                        <p>Amount</p>
                        <p>Count</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">Profit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {totalList.length !== 0 && totalList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component='th'>{item.token_name}</TableCell>

                    <TableCell>
                    <div className="multiRow">
                        <p>{numberWithCommas(Math.floor(item.totalBuy))}</p>
                        <p>{numberWithCommas(Math.floor(item.countBuy))}</p>
                    </div>
                      
                    </TableCell>

                    <TableCell>
                    <div className='multiRow'>
                        <p>{numberWithCommas(Math.floor(item.totalSell))}</p>
                        <p>{numberWithCommas(Math.floor(item.countSell))}</p>
                    </div>
                     
                    </TableCell>

                    <TableCell align='center'>{numberWithCommas(Math.floor(item.profit))}</TableCell>

                  </TableRow>
                ))}
                {totalList.length !== 0 && (
                  <TableRow >
                    <TableCell component='th'>Total</TableCell>
                    <TableCell align='center'>{numberWithCommas(Math.floor(totalBuy))}</TableCell>
                    <TableCell align='center'>{numberWithCommas(Math.floor(totalSell))}</TableCell>
                    <TableCell align='center'>{numberWithCommas(Math.floor(totalSell - totalBuy))}</TableCell>
                  </TableRow>
                )}
                <TableRow >
                  <TableCell colSpan={2} align='center' id='loading' style={{ textAlign: 'center' }}>
                    {loading && <CircularProgress color="primary" />}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

    </div>
  )
}

export default MarketHistory