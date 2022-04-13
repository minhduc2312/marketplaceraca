import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel, Box } from '@mui/material'
import PropTypes from 'prop-types';

import millify from 'millify'
import React, { useState } from 'react'
import ModalUI from './ModalUI'

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'value') {
        a[orderBy] = a.price * a.amount;
        b[orderBy] = b.price * b.amount;
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'date',
        label: 'Date',
    },
    {
        id: 'amount',
        label: 'Amount',
    },
    {
        id: 'price',
        label: 'Price',
    },
    {
        id: 'status',
        label: 'Status',
    },
    {
        id: 'value',
        label: 'Value',
    },
]
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            className='sort-icon'
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ margin: 0 }}
                        >
                            {headCell.label}

                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,

};
const TransactionsModal = ({ infoTransactions, setInfoTransactions }) => {
    const [isOpen, setOpen] = useState(true)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const { tokenName, listTransactions } = infoTransactions;
    console.log(listTransactions)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <ModalUI isOpen={isOpen} setOpen={setOpen} onClose={setInfoTransactions}>
            <Typography align='center'>{tokenName}'s Transactions</Typography>
            <TableContainer id='table_transactions'>
                <Table stickyHeader>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(listTransactions, getComparator(order, orderBy))
                            .map((row, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell align='center'>{row.date}</TableCell>
                                        <TableCell align='center'>{millify(row.amount, {
                                            precision: 2,
                                            decimalSeparator: ","
                                        })}</TableCell>
                                        <TableCell align='center'>{millify(row.price, {
                                            precision: 5,
                                            decimalSeparator: ","
                                        })}</TableCell>
                                        <TableCell align='center'>{row.status.toUpperCase()}</TableCell>

                                        <TableCell align='center'>{millify(row.price * row.amount, {
                                            precision: 2,
                                            decimalSeparator: ","
                                        })} $</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </ModalUI>
    )
}

export default TransactionsModal