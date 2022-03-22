import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SwapRacaToUSD from "./SwapRaca";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../../styles/nfts.css';
import { useSelector } from "react-redux";



const getAPI = (categoryId = '', size = '') => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageSize=${size}&sortBy=fixed_price&order=asc&category=${categoryId}&tokenId=-1`, {
        "Access-Control-Allow-Origin": "*"
    });
}
const ConvertDDMM = (datetime) => {
    const [time] = datetime.toLocaleString().split(',');
    return `${time.split(' ').join('')}`
}
const getStats = (categoryId = '') => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=10&status=executed&tokenId=-1&category=${categoryId}`, {
        "Access-Control-Allow-Origin": "*"
    });
}
const getStatsPotion = (categoryId = '') => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=10&status=executed&tokenId=-1&category=${categoryId}`, {
        "Access-Control-Allow-Origin": "*"
    });
}

export function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const NFTs = () => {
    const [listMetamon, setListMetamon] = useState([]);
    const [listDiamond, setListDiamond] = useState([]);
    const [listEgg, setListEgg] = useState([]);
    const [listPotion, setListPotion] = useState([]);
    const [kissUpLand, setKissUpLand] = useState({});
    const [BigGreen, setBigGreen] = useState({});
    const [MetamonR, setMetamonR] = useState({});
    const [MMLand, setMMLand] = useState({});
    const [tokenPrice, setTokenPrice] = useState(0);
    const [timeUpdated, setTimeUpdated] = useState("")
    const [listStats, setListStats] = useState([]);
    const [listStatsPotion, setListStatsPotion] = useState([]);

    const convertDateTime = () => {
        const now = new Date();
        setTimeUpdated(now.toLocaleString())
    }
    const { raca, elmon, elcoin, btc } = useSelector(state => state.price)
    const getData = async () => (
        Promise.all([
            getAPI(13, 10).then(res =>
                setListMetamon(res.data.list)
            ),
            getAPI(15, 10).then(res =>
                setListPotion(res.data.list)
            ),
            getAPI(16, 10).then(res =>
                setListDiamond(res.data.list)
            ),
            getAPI(17, 10).then(res =>
                setListEgg(res.data.list)
            ),
            getStats(17).then(res =>
                setListStats(res.data.list)
            ),
            getStatsPotion(15).then(res =>
                setListStatsPotion(res.data.list)
            ),
            getAPI(20, 1).then(res => {
                setKissUpLand(res.data.list[0]);
                document.querySelector('.loading')?.classList.toggle('loading');
            }),
            getAPI(23, 1).then(res => {
                setMetamonR(res.data.list[0]);
                document.querySelector('.loading')?.classList.toggle('loading');
            }),
            getAPI(7, 1).then(res => {
                setMMLand(res.data.list[0]);
                document.querySelector('.loading')?.classList.toggle('loading');
            }),
            getAPI(46, 1).then(res => {
                setBigGreen(res.data.list[0]);
                document.querySelector('.loading')?.classList.toggle('loading');
            }),
        ])
    )
    useEffect(() => {
        setTokenPrice(raca)
    }, [raca])
    useEffect(() => {
        getData();
        convertDateTime();
        
        // const formData = new FormData();
        // formData.append('address', "0x769ba0cb0d89666f7506194d2cf416ea0f812e16");
        // formData.append('sign', "0x6987eccb7cdef2820794cfbd1067d7322175230d752c5a3f4ed2b5405d7cc2f63a3951cf7e2ba03f1ba447d6c720fc1eb304a2e2fd61b43f7afe72a2cff9d1b11c");
        // formData.append('msg', "LogIn-17816549-8c50-98b7-f684-163d8e0eaea4");
        // const payload = {
        //     address: '0x769ba0cb0d89666f7506194d2cf416ea0f812e16',
        //     sign: '0x6987eccb7cdef2820794cfbd1067d7322175230d752c5a3f4ed2b5405d7cc2f63a3951cf7e2ba03f1ba447d6c720fc1eb304a2e2fd61b43f7afe72a2cff9d1b11c',
        //     msg: 'LogIn-17816549-8c50-98b7-f684-163d8e0eaea4',
        // }
        // axios({
        //     method: 'POST',
        //     url: 'https://metamon-api.radiocaca.com/usm-api/login',
        //     data: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     }
        // }).then(function (response) {
        //     console.log(response.data)
        //     const formData1 = new FormData();
        //     formData1.append('address', '0x769ba0cb0d89666f7506194d2cf416ea0f812e16')
        //     axios({
        //         method: 'POST',
        //         url: 'https://metamon-api.radiocaca.com/usm-api/getBattleRecord',
        //         data: formData1,
        //         headers: {
        //             "accessToken": response.data.data
        //         }
        //     }).then(function (response) {
        //         console.log(response);
        //     })
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        const rerender = setInterval(() => {
            getData();
            convertDateTime();
        }, 20000)

        return () => {
            setListMetamon([])
            setListDiamond([])
            setListEgg([])
            setListPotion([])
            setListStats([])
            setKissUpLand({})
            setTokenPrice(0)
            clearInterval(rerender);
        }
    }, []);

    return (
        <div>
            <div className="priceToken">
                <p className='tokenPrice'>RACA: {raca}</p>
                <p className='tokenPrice'>ELMON: {elmon}</p>
                <p className='tokenPrice'>ELCOIN: {elcoin}</p>
                <p className='tokenPrice'>BTC: {numberWithCommas(btc)}</p>
            </div>

            <SwapRacaToUSD />
            <p id='timeUpdated'>{timeUpdated}</p>
            <div className='pricetable'>
                <TableContainer className='table-scroll' component={Paper}>
                    <Table className='tablePrice' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">
                                    <img width='50px' height='50px' src='/marketplaceraca/metamon.png' alt='Metamon' />
                                </TableCell>
                                <TableCell align="center">
                                    <img width='50px' height='50px' src='/marketplaceraca/MetamonEgg.png' alt='Egg' />
                                </TableCell>
                                <TableCell align="center">
                                    <img width='50px' height='50px' src='/marketplaceraca/DiamondYellow.png' alt='DiamondYellow' />
                                </TableCell>
                                <TableCell align="center">
                                    <img style={{ objectFit: 'contain' }} width='50px' height='50px' src='/marketplaceraca/potion.png' alt='Potion' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listEgg && listMetamon && listDiamond && listPotion && listEgg.map((child, index) => {
                                return (
                                    <TableRow key={index + 1}>
                                        <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listMetamon[index]?.fixed_price))} (~{(tokenPrice * listMetamon[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listEgg[index]?.fixed_price))} (~{(tokenPrice * listEgg[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listDiamond[index]?.fixed_price))} (~{(tokenPrice * listDiamond[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listPotion[index]?.fixed_price))} (~{(tokenPrice * listPotion[index]?.fixed_price).toFixed(2)})</TableCell>
                                    </TableRow>)
                            })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <div id='xike'>
                    <p>Xìke Captain</p>
                    <img alt='Xike' src='/marketplaceraca/xike.png' />

                </div>
            </div>
            <div className="stats-session">
                <div className='stats'>
                    <div className='header'>
                        <p style={{
                            position: 'absolute',
                            left: '0px',
                            marginTop: '0px',
                        }}>Stats</p>
                        <img width='50px' height='50px' className='symbols' src='/marketplaceraca/MetamonEgg.png' alt='Egg' />

                    </div>
                    <TableContainer className='table-scroll' component={Paper}>
                        <Table className='tablePrice' aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="center">
                                        <p>Price</p>
                                    </TableCell>
                                    <TableCell align="center">
                                        <p>Count</p>
                                    </TableCell>
                                    <TableCell align="center">
                                        <p>Time</p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listStats && listStats.map((item, index) => {
                                    return (
                                        <TableRow key={index + 1}>
                                            <TableCell align="center" component='th' scope="row">{index + 1}</TableCell>
                                            <TableCell style={{ paddingLeft: '5px' }} align="center">{numberWithCommas(Math.floor(item?.fixed_price / item.count))}</TableCell>
                                            <TableCell align="center">{numberWithCommas(item.count)}</TableCell>
                                            <TableCell align="center">{ConvertDDMM(new Date(item.timestamp * 1000))}</TableCell>
                                        </TableRow>)
                                })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='stats'>
                    <div className='header'>
                        <img width='50px' height='50px' style={{ objectFit: 'contain' }} className='symbols' src='/marketplaceraca/potion.png' alt='Potion' />
                    </div>
                    <TableContainer className='table-scroll' component={Paper}>
                        <Table className='tablePrice' aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="center">
                                        <p>Price</p>
                                    </TableCell>
                                    <TableCell align="center">
                                        <p>Count</p>
                                    </TableCell>
                                    <TableCell align="center">
                                        <p>Time</p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listStatsPotion && listStatsPotion.map((item, index) => {
                                    return (
                                        <TableRow key={index + 1}>
                                            <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                            <TableCell align="center" style={{ paddingLeft: '1px' }}>{numberWithCommas(Math.floor(item?.fixed_price / item.count))}</TableCell>
                                            <TableCell align="center">{numberWithCommas(item.count)}</TableCell>
                                            <TableCell align="center">{ConvertDDMM(new Date(item.timestamp * 1000))}</TableCell>
                                        </TableRow>)
                                })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <div className="cards">
                {MetamonR &&
                    <div className="card loading">
                        <Card nft={MetamonR} />
                    </div>}

                {BigGreen &&
                    <div className="card loading">
                        <Card nft={BigGreen} />
                    </div>}

                {MMLand &&
                    <div className="card loading">
                        <Card nft={MMLand} />
                    </div>}

                {kissUpLand &&
                    <div className="card loading"><Card nft={kissUpLand} />
                    </div>}

            </div>
        </div>
    );
}
export default NFTs;