import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import millify from 'millify'
import React, { useState } from 'react'
import ModalUI from './ModalUI'

const TransactionsModal = ({ infoTransactions, setInfoTransactions }) => {
    const [isOpen, setOpen] = useState(true)

    const { tokenName, listTransactions } = infoTransactions;

    return (
        <ModalUI isOpen={isOpen} setOpen={setOpen} onClose={setInfoTransactions}>
            <Typography align='center'>{tokenName}'s Transactions</Typography>
            <TableContainer id='table_transactions'>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Time</TableCell>
                            <TableCell align='center'>Amount</TableCell>
                            <TableCell align='center'>Price</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listTransactions && listTransactions.map((transaction, index) =>
                        (
                            <TableRow key={index} >
                                <TableCell align='center'>{transaction.date}</TableCell>
                                <TableCell align='center'>{millify(transaction.value, {
                                    precision: 2,
                                    decimalSeparator: ","
                                })}</TableCell>
                                <TableCell align='center'>{millify(transaction.price, {
                                    precision: 5,
                                    decimalSeparator: ","
                                })}</TableCell>
                                <TableCell align='center'>{transaction.status.toUpperCase()}</TableCell>

                                <TableCell align='center'>{millify(transaction.price * transaction.value, {
                                    precision: 2,
                                    decimalSeparator: ","
                                })} $</TableCell>
                            </TableRow>
                        )
                        )}


                    </TableBody>
                </Table>
            </TableContainer>

        </ModalUI>
    )
}

export default TransactionsModal