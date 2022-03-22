import axios from "axios";
import React, { createElement, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, cardClasses } from '@mui/material';
import { InputSelect } from "./InputSelect";
import { numberWithCommas } from '../NFTs/NFTs';
import { useDispatch, useSelector } from "react-redux";

import '../../styles/metamon.css'
import '../../styles/nfts.css'
import { handleArrange } from "../../app/actions";


const getData = (minScore = 315, level = 1, pageNo = 1) => {
    return axios(`https://market-api.radiocaca.com/nft-sales?saleType&category=13&tokenType&tokenId=-1&pageNo=${pageNo}&pageSize=100&sortBy=single_price&order=asc&min_level=${level}&max_level=60&min_score=${minScore}&max_score=`, {
        "Access-Control-Allow-Origin": "*"
    });
}

const Metamon = () => {
    const { minScore, level, arrange } = useSelector(state => state.filters)

    const [listMetamon, setListMetamon] = useState([])
    const [listShow, setListShow] = useState([])
    const dispatch = useDispatch();
    const { raca } = useSelector(state => state.price);

    const showInfo = (e) => {
    }
    const getListMetamon = async () => {
        await getData(minScore, level, 1).then(async (res) => {
            const data = res.data;
            let listData = res.data.list
            // console.log(data.list.total)
            for (let i = 1; i <= Math.floor(data.total / 100); i++) {
                const list = await getData(minScore, level, i + 1).then(res => res.data.list);
                listData = listData.concat(list)
                // console.log(listData)
            }
            setListMetamon(listData)
        });
    }

    useEffect(() => {
        getListMetamon();
        dispatch(handleArrange(0));
        return () => {
            setListMetamon([])
        }
    }, [minScore, level])
    useEffect(() => {
        //Get list property
        const sortBy = (filter) => {
            return listMetamon.sort((a, b) => {
                if (filter === 'fixed_price') {
                    return Number(a[filter]) - Number(b[filter])
                } else {
                    return Number(b[filter]) - Number(a[filter])
                }
            });
        }

        switch (arrange) {
            case 0:
                setListShow(sortBy('fixed_price').slice(0, 10));
                break;
            case 1:
                setListShow(sortBy('level').slice(0, 10));
                break;
            case 2:
                setListShow(sortBy('score').slice(0, 10));
                break;
            default:
                break;
        }

        return () => {
            setListShow([])
        }
    }, [listMetamon, arrange]);

    return (
        <Box sx={{ textAlign: 'left' }}>
            <InputSelect />
            <TableContainer className='table-scroll metamon' component={Paper}>
                <Table className='tablePrice' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">

                            </TableCell>
                            <TableCell align="center">
                                ID
                            </TableCell>
                            <TableCell align="center">
                                Score
                            </TableCell>
                            <TableCell align="center">
                                Level
                            </TableCell>
                            <TableCell align="center" sx={{ width: '25%' }}>
                                Price
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listShow && listShow.map((metamon, index) => {
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell id={`metamon-${index + 1}`} onMouseEnter={showInfo} align="center" component="th" scope="row" sx={{ position: 'relative' }}>
                                        <img width='50px' height='50px' src={metamon.image_url} alt='Metamon' />
                                    </TableCell>
                                    <TableCell align="center" component="td" scope="row">
                                        <a href={`https://market.radiocaca.com/#/market-place/${metamon.id}`} target='_blank'
                                            style={{ color: '#fff', textDecoration: 'none' }}
                                            rel="noreferrer"
                                        >
                                            {metamon.token_id}</a></TableCell>
                                    <TableCell align="center" component="td" scope="row">{metamon?.score}</TableCell>
                                    <TableCell align="center" component="td" scope="row">{metamon?.level}</TableCell>
                                    <TableCell align="center" component="td" scope="row">{numberWithCommas(metamon.fixed_price)} (~{(raca * metamon.fixed_price).toFixed(2)})</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Metamon;

