import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import ModalUI from './ModalUI'

const TransactionsModal = ({ infoTransactions, setInfoTransactions }) => {
    const [isOpen, setOpen] = useState(true)
    console.log(infoTransactions)
    const { tokenName, listTransactions } = infoTransactions;
    console.log(listTransactions)
    return (
        <ModalUI isOpen={isOpen} setOpen={setOpen} onClose={setInfoTransactions}>
            <Typography align='center'>{tokenName}'s Transactions</Typography>
            <Table id='table_transactions'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Time</TableCell>
                        <TableCell align='center'>Amount</TableCell>
                        <TableCell align='center'>Status</TableCell>
                        <TableCell align='center'>Price</TableCell>
                        <TableCell align='center'>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listTransactions && listTransactions.map((transaction, index) =>
                    (
                        <TableRow TableRow key={index} >
                            <TableCell align='center'>{transaction.date}</TableCell>
                            <TableCell align='center'>{transaction.value}</TableCell>
                            <TableCell align='center'>{transaction.status}</TableCell>
                            <TableCell align='center'>{transaction.price}</TableCell>
                            <TableCell align='center'>{transaction.price * transaction.value}</TableCell>
                        </TableRow>
                    )
                    )}


                </TableBody>
            </Table>
        </ModalUI>
    )
}

export default TransactionsModal