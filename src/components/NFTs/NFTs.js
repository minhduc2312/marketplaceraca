import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SwapRacaToUSD from "./SwapRaca";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, MenuItem, Select, FormControl} from '@mui/material';
import '../../styles/nfts.css';
import { useSelector } from "react-redux";
import millify from "millify";



const getAPI = (categoryId = '', size = '') => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageSize=${size}&sortBy=fixed_price&order=asc&category=${categoryId}&tokenId=-1`, {
        "Access-Control-Allow-Origin": "*"
    });
}
const ConvertDDMM = (datetime) => {
    const [date, time] = datetime.toLocaleString().split(',');
    return `${time.split(' ')[1]}`
}
const getStats = (categoryId = '') => {
    let tokenId;
    if (categoryId === 15 || categoryId === 16) {
        tokenId = 0
    } else {
        tokenId = -1
    }
    return axios(`https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=10&status=executed&tokenId=${tokenId}&category=${categoryId}`, {
        "Access-Control-Allow-Origin": "*"
    });
}
const getSellList = (formDataPrams) => {
    const formDataLogin = new FormData();
    formDataLogin.append('address', "0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16");
    formDataLogin.append('sign', "0x44063b19d6cd4ce60cda4db25aade076e2206b3539f6f5a62237fb6c0ed31fe84e7770f66cc3e623cf520cdf353a116491af88f4c53894d424914888c677ac321c");
    formDataLogin.append('msg', "LogIn-79a8ee53-dc8b-ef50-a811-086c474b1566");
    formDataLogin.append('network', "1");
    formDataLogin.append('clientType', "MetaMask");

    return axios({
        method: 'POST',
        url: 'https://metamon-api.radiocaca.com/usm-api/login',
        data: formDataLogin,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((res) => {
        const data = res.data.data;
        return axios({
            method: 'POST',
            url: 'https://metamon-api.radiocaca.com/usm-api/shop-order/sellList',
            data: formDataPrams,
            headers: {
                "Content-Type": "multipart/form-data",
                "accesstoken": data.accessToken,
            }
        });
    }).catch(err => console.log(err))
}

export function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const getFormDataValhalla = () => {
    const formData = new FormData();
    formData.append('address', '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16')
    formData.append('type', 8)
    formData.append('orderType', 3)
    formData.append('orderId', -1)
    formData.append('pageSize', 5)
    return formData;
}
const selectStatsList = [
    {
        name: 'Metamon',
        id: 13,
        img: 'metamon.png'
    },
    {
        name: 'Diamond Yellow',
        id: 16,
        img: 'DiamondYellow.png'
    },
    {
        name: 'Potion',
        id: 15,
        img: 'potion.png'
    },
    {
        name: 'Kiss-up State Land',
        id: 20,
        img: 'kissup.png'
    },
    {
        name: 'Musk USM Land',
        id: 7,
        img: 'mml.png'
    },
]
const NFTs = () => {
    const [listMetamon, setListMetamon] = useState([]);
    const [listDiamond, setListDiamond] = useState([]);
    const [listEgg, setListEgg] = useState([]);
    const [listPotion, setListPotion] = useState([]);
    const [kissUpLand, setKissUpLand] = useState({});
    const [BigGreen, setBigGreen] = useState({});
    const [MetamonR, setMetamonR] = useState({});
    const [MMLand, setMMLand] = useState({});
    const [selectStats, setSelectStats] = useState(selectStatsList[0].id);
    const [selectedStatsList, setSelectedStatsList] = useState();
    const [tokenPrice, setTokenPrice] = useState(0);
    const [timeUpdated, setTimeUpdated] = useState("")
    const [listStats, setListStats] = useState([]);
    const [sellListValhalla, setSellListValhalla] = useState([]);
    const [listStatsPotion, setListStatsPotion] = useState([]);

    const convertDateTime = () => {
        const now = new Date();
        setTimeUpdated(now.toLocaleString())
    }
    const handleChangeSelect = (e) => {
        // console.log(e.target.value)
        setSelectStats(e.target.value)
    }
    const { raca, elmon, elcoin, btc } = useSelector(state => state.price)
    const getData = async () => (
        Promise.all([
            getAPI(13, 5).then(res =>
                setListMetamon(res.data.list)
            ),
            getAPI(15, 5).then(res =>
                setListPotion(res.data.list)
            ),
            getAPI(16, 5).then(res =>
                setListDiamond(res.data.list)
            ),
            getAPI(17, 5).then(res =>
                setListEgg(res.data.list)
            ),
            getStats(17).then(res =>
                setListStats(res.data.list)
            ),
            getStats(15).then(res =>
                setListStatsPotion(res.data.list)
            ),
            getSellList(getFormDataValhalla()).then(res =>
                setSellListValhalla(res.data.data.shopOrderList)
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

        // 
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
    useEffect(() => {
        // const getSelected = selectStatsList.filter(item=> item.id === selectStats);
        getStats(selectStats, 10).then(res => setSelectedStatsList(res.data.list));
        // setSelectedStats(getSelected)
        return () => {

        }
    }, [selectStats])
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
                                <TableCell align="center">
                                    <img style={{ objectFit: 'contain' }} width='50px' height='50px' src='/marketplaceraca/valhalla.png' alt='Potion' />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listEgg && listMetamon && listDiamond && listPotion && listEgg.map((child, index) => {
                                return (
                                    <TableRow key={index + 1}>
                                        <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                        <TableCell align="center">{millify(Math.floor(listMetamon[index]?.fixed_price))} (~{(tokenPrice * listMetamon[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listEgg[index]?.fixed_price))} (~{(tokenPrice * listEgg[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listDiamond[index]?.fixed_price))} (~{(tokenPrice * listDiamond[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(listPotion[index]?.fixed_price))} (~{(tokenPrice * listPotion[index]?.fixed_price).toFixed(2)})</TableCell>
                                        <TableCell align="center">{numberWithCommas(Math.floor(sellListValhalla[index]?.amount))} (~{(tokenPrice * sellListValhalla[index]?.amount).toFixed(2)})</TableCell>
                                    </TableRow>)
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <div id='xike'>
                    <p>Xìke Captain</p>
                    <img alt='Xike' src='/marketplaceraca/xike.png' />
                </div>
            </div>
            <Box className="stats-session">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '5px 12px' }}>
                    <Typography style={{
                        textTransform: 'uppercase',
                        fontWeight: "bold",
                        fontSize: "larger",
                    }}>Stats</Typography>
                    <FormControl className='select-stats' style={{ width: '150px' }}>
                        <Select
                            size='small'
                            labelId="select"
                            id="filter"
                            value={selectStats}
                            onChange={handleChangeSelect}
                            sx={{ color: '#fff', }}
                            className='select-stats'
                        >
                            {selectStatsList && selectStatsList.map((item, index) => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: "2%" }}>
                    <Box className='stats'>
                        <img width='50px' height='50px' className='symbols' src='/marketplaceraca/MetamonEgg.png' alt='Egg' />
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
                    </Box>
                    <Box className='stats'>
                        <img width='50px' height='50px' style={{ objectFit: 'contain' }} className='symbols' src={`/marketplaceraca/${selectStatsList.filter(item => item.id === selectStats)[0].img}`} alt={selectStatsList.filter(item => item.id === selectStats)[0].name} />
                        <TableContainer className='table-scroll' component={Paper}>
                            <Table className='tablePrice' aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">
                                            <p>Price</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>{Number(selectStats) === 13 ? "Info" : "Count"}</p>
                                        </TableCell>
                                        <TableCell align="center">
                                            <p>Time</p>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedStatsList && selectedStatsList.map((item, index) => {
                                        return (
                                            <TableRow key={index + 1}>
                                                <TableCell align="center" component="th" scope="row">{index + 1}</TableCell>
                                                <TableCell align="center" style={{ paddingLeft: '1px' }}>{millify(Math.floor(item?.fixed_price / item.count))}</TableCell>
                                                {Number(selectStats) === 13 ? (
                                                   <TableCell className="info-metamon-cell" padding='none'> 
                                                       <Typography sx={{color:'#fff',fontSize:'12px'}}>{item.level}</Typography>
                                                        <Typography sx={{ color: '#fff',fontSize:'12px' }}>{item.score}</Typography>
                                                   </TableCell>

                                                ) : (
                                                <TableCell align="center">{numberWithCommas(item.count)}</TableCell>

                                                )}
                                                <TableCell align="center">{ConvertDDMM(new Date(item.timestamp * 1000))}</TableCell>
                                            </TableRow>)
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>

            </Box>

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
        </div >
    );
}
export default NFTs;