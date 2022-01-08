import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { InputSelect } from "./InputSelect";
import { numberWithCommas } from '../NFTs/PriceTable';

const getData = () => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageSize=1600&sortBy=fixed_price&order=asc&category=13&tokenId=-1`, {
        "Access- Control - Allow - Origin": "*"
    });
}

const getProperty = (id) => {
    return axios(`https://market-api.radiocaca.com/nft-sales/${id}`, {
        "Access-Control-Allow-Origin": "*"
    });
}
const Metamon = () => {
    const [lowestPrice, setLowestPrice] = useState([]);
    const [listProperty, setListProperty] = useState([]);
    // const [highestScore, setHighestScore] = useState([]);
    // const [highestLevel, setHighestLevel] = useState([]);
    const [filter, setFilter] = useState(0)

    console.log(filter);
    const callbackFunction = (value) => {
        setFilter(value)
    }
    const getListMetamon = async () => {
        await getData().then(async (res) => {
            const data = res.data.list;
            let lowest = data.sort((pre, cur) => {
                if (pre.fixed_price < cur.fixed_price) {
                    return 1;
                }
                return 0;
            })
            let highestLevel = data.sort((pre, cur) => {
                if (pre.fixed_price < cur.fixed_price) {
                    return 1;
                }
                return 0;
            })
            lowest.length = 10;

            setLowestPrice(lowest);
        });
    }

    useEffect(() => {
        getListMetamon();
        return () => {
            setLowestPrice([]);
        }
    }, [])
    useEffect(() => {
        //Get list property
        try {
            (async () => {
                const promises = lowestPrice.map(async (metamon) => {
                    return await getProperty(metamon.id).then(res => res.data.data.properties)
                })
                let promiseValues = await Promise.all(promises);
                promiseValues = promiseValues.map(item => {
                    return {
                        score: item[4].value,
                        level: item[2].value,
                    }
                })
                console.log(promiseValues);
                setListProperty(promiseValues);
            })();
        } catch (err) {
            console.log(err)
        }

    }, [lowestPrice]);

    return (
        <Box sx={{ textAlign: 'left' }}>
            <InputSelect getFilter={callbackFunction} />
            <TableContainer id='table-scroll' component={Paper}>
                <Table id='tablePrice' aria-label="simple table">
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
                            <TableCell align="center">
                                Price
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lowestPrice && lowestPrice.map((metamon, index) => {

                            {/* console.log(listProperty); */ }
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <a href={`https://market.radiocaca.com/#/market-place/${metamon.id}`} target='_blank' rel="noreferrer">

                                            <img width='50px' height='50px' src={metamon.image_url} alt='Metamon' />
                                        </a>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <a href={`https://market.radiocaca.com/#/market-place/${metamon.id}`} target='_blank'
                                            style={{ color: '#363636', textDecoration: 'none' }}
                                            rel="noreferrer"
                                        >
                                            {metamon.token_id}</a></TableCell>
                                    <TableCell align="center" component="th" scope="row">{listProperty[index]?.score}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{listProperty[index]?.level}</TableCell>
                                    <TableCell align="center" component="th" scope="row">{numberWithCommas(metamon.fixed_price)}</TableCell>
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

