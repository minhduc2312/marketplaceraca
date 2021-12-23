import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import { numberWithCommas } from './NFTs/PriceTable'
import axios from 'axios';
import { TextField, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config"
import { collection, getDocs, getFirestore, query, orderBy } from "firebase/firestore";

function createData(name, totalSales, totalCost, totalWithdraw, percent) {
    const sales = totalSales * percent / 100;
    const cost = totalCost * percent / 100;
    const profit = (sales - cost);
    const withdraw = totalWithdraw * percent / 100;
    const remain = profit - withdraw;
    return { name, sales, cost, profit, withdraw, remain };
}

const getHistory = (page, size) => {
    return axios.get(`https://market-api.radiocaca.com/users/0x10201091597635eC7b8e208306E6aDCC7c167925/histories?pageNo=${page}&pageSize=${size}`);

}


const Sales = () => {
    const [listHistory, setListHistory] = useState([]);
    const [listSummary, setListSummary] = useState([]);
    const [listWithdraw, setListWithdraw] = useState([]);
    const [toggle, setToggle] = useState(false);

    const handleAddTrans = () => {
        setToggle(prev => !prev)
    }

    useEffect(async () => {
        let total = 0;
        let currentPage = 1;
        let listTemp = [];
        let size = 10;
        const fetchData = async () => {
            do {
                const response = await getHistory(currentPage, size)
                currentPage++;
                total = response.data.total;
                listTemp = [...listTemp, ...response.data.list]
            } while (listTemp.length < total)

            setListHistory(listTemp)
        }
        fetchData();

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const q = query(collection(db, "Transaction"), orderBy("time"));

        const querySnapshot = await getDocs(q);
        const tempList = [];
        querySnapshot.forEach((doc) => {
            tempList.push(doc.data());
        });

        const newList = tempList.map(item => {
            return {
                ...item,
                time: new Date(item.time.seconds * 1000).toLocaleString().split(',')[0]

            }
        })
        setListWithdraw(newList);
        return () => {
            setListHistory([])
            setListWithdraw([])
        }

    }, [])
    useEffect(() => {

        const listSales = listHistory.filter(item => item.nft_token_id === 407301)
        const listCost = listHistory.filter(item => item.nft_token_id === 403545)

        let sumSales = listSales.reduce((prev, curr) => {
            return prev + (Number(curr.amount) - Number(curr.fee))
        }, 0);
        let sumCost = listCost.reduce((prev, curr) => {
            return prev + Number(curr.amount)
        }, 0);

        let withdraw = 0;
        let cost = 0;
        listWithdraw.forEach((item) => {
            if (item.transfer) {
                withdraw += item.amount;
            } else {
                cost += item.amount;
            }

        }, 0);
        sumCost += cost;
        sumSales -= 2700;
        setListSummary([
            createData("Johny Duc", sumSales, sumCost, withdraw, 40),
            createData("Khang Pug", sumSales, sumCost, withdraw, 40),
            createData("Duc Professor", sumSales, sumCost, withdraw, 20),
            createData("Total", sumSales, sumCost, withdraw, 100),
        ]);
    }, [listHistory, listWithdraw])
    return (
        <div className="sales">
            <TableContainer id="sales-section" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Sales</TableCell>
                            <TableCell align="center">Cost</TableCell>
                            <TableCell align="center">Profit</TableCell>
                            <TableCell align="center">Withdraw</TableCell>
                            <TableCell align="center">Remain</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listSummary && listSummary.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{numberWithCommas(Math.floor(row.sales))}</TableCell>
                                <TableCell align="center">{numberWithCommas(Math.floor(row.cost))}</TableCell>
                                <TableCell align="center">{numberWithCommas(Math.floor(row.profit))}</TableCell>
                                <TableCell align="center">{numberWithCommas(Math.floor(row.withdraw))}</TableCell>
                                <TableCell align="center">{numberWithCommas(Math.floor(row.remain))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div id="withdraw-history">
                <h2 style={{
                    textAlign: 'left'
                }}>Withdraw History</h2>
                <div id="addTransaction">
                    <Button
                        size="medium"
                        id="toggleButton"
                        onClick={handleAddTrans}
                        variant="contained" >Add Transaction</Button>
                    {toggle && (
                        <React.StrictMode>
                            <TextField
                                type='number'
                                label="Amount"
                                variant="outlined" size="small"
                                style={{ marginBottom: '10px' }} />
                            <TextField
                                label="Notes" variant="outlined" size="small" id="notes"
                                style={{ marginBottom: '10px' }} />
                            <Button id="addButton" size="medium" variant="contained">Add</Button>
                        </React.StrictMode>
                    )}
                </div>
                <TableContainer id='withdraw' component={Paper}>
                    <Table sx={{ minWidth: 250 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Note</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listWithdraw && listWithdraw.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.time}
                                    </TableCell>
                                    <TableCell align="center">{numberWithCommas(row.amount)}</TableCell>
                                    <TableCell align="center">{numberWithCommas(row.notes)}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default Sales;