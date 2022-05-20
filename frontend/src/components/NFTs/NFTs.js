import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "./Card";
import SwapRacaToUSD from "./SwapRaca";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, MenuItem, Select, FormControl } from '@mui/material';
import '../../styles/nfts.css';
import { useSelector } from "react-redux";
import millify from "millify";
import StatsChart from "./StatsChart/StatsChart";



const ConvertDDMM = (datetime) => {
    const [, time] = datetime.toLocaleString().split(',');
    return `${time.split(' ')[1]}`
}

const getSellIngameList = (formDataPrams) => {
    const formDataLogin = new FormData();
    formDataLogin.append('address', "0xC036b531B53A63A3Ff5788271306aAD1cF4d5526");
    formDataLogin.append('sign', "0x31a7f8a4765247acbab481e9738bf758699a1c00f6b1025e4e48ea9a1cb16b743736013e93cb1661a0ac0db1ab3bda967e88c535ea9db91da4107a49900abb1a1b");
    formDataLogin.append('msg', "LogIn-360adb6c-2ba1-958a-dacd-83cfa6662d5a");
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
const getFormData = (type) => {
    const formData = new FormData();
    formData.append('address', '0xC036b531B53A63A3Ff5788271306aAD1cF4d5526')
    formData.append('type', type)
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

const selectIngameList = [
    {
        name: 'Valhalla',
        type: 8,
        img: 'valhalla.png'
    },
    {
        name: 'Egg',
        type: 6,
        img: 'MetamonEgg.png'
    },
    {
        name: 'Anti Fatigue',
        type: 11,
        img: 'AntiFatiguePotion.png'
    },
    {
        name: 'Purple Potion',
        type: 10,
        img: 'purple-potion.png'
    },
    {
        name: 'Villa Fragments',
        type: 1015,
        img: 'villa.png'
    },
    {
        name: 'Mansion Fragments',
        type: 1016,
        img: 'mansion.png'
    },
    {
        name: 'Castle Fragments',
        type: 1017,
        img: 'castle.png'
    },
    {
        name: 'Donuts',
        type: 1004,
        img: 'Donuts.png'
    },
]

const NFTs = () => {
    const [priceMarketList, setPriceMarketList] = useState([]);
    const [selectStats, setSelectStats] = useState(selectStatsList[0].id);
    const [selectedStatsList, setSelectedStatsList] = useState([]);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [timeUpdated, setTimeUpdated] = useState("")
    const [eggStatsList, setEggStatsList] = useState([]);
    const [sellIngameList, setSellIngameList] = useState([]);
    const [selectTypeIngame, setSelectTypeIngame] = useState(selectIngameList[0].type);
    const refSelect = useRef();

    const convertDateTime = () => {
        const now = new Date();
        setTimeUpdated(now.toLocaleString())
    }
    const handleChangeSelect = (e) => {
        // console.log(e.target.value)
        setSelectStats(e.target.value)
    }
    const handleChangeSelectSellIngame = (e) => {
        setSelectTypeIngame(e.target.value)
    }
    const { raca, elmon, elcoin, btc } = useSelector(state => state.price)
    const getData = useCallback(async () => {

        axios.get("api/raca/market/price").then(res => {
            let data = {}
            res.data.forEach(item => {
                data = {
                    ...data,
                    ...item
                }
            })
            setPriceMarketList(data)
        })
        axios.get(`/api/raca/market/stats/17`).then(res => setEggStatsList(res.data))
        axios.get(`/api/raca/market/stats/${selectStats}`).then(res => setSelectedStatsList(res.data))
    }, [selectStats])
    useEffect(() => {

        setTokenPrice(raca)
    }, [raca])
    useEffect(() => {
        getData();
        convertDateTime();
        const rerenderData = setInterval(() => {
            getData();
            convertDateTime();
        }, 20000)

        return () => {
            setEggStatsList([])
            setTokenPrice(0)
            clearInterval(rerenderData);
        }
    }, [getData]);
    useEffect(() => {

        axios.get(`/api/raca/market/stats/${selectStats}`).then(res => setSelectedStatsList(res.data))
        return () => {
            setSelectedStatsList([])
        }
    }, [selectStats])

    useEffect(() => {
        const getChild = refSelect.current.childNodes[0]

        if (getChild?.childNodes[1]) {
            getChild?.removeChild(getChild?.childNodes[1])
        }

        getSellIngameList(getFormData(selectTypeIngame)).then(res => {
            if (res?.data) {
                const data = res.data.data;
                setSellIngameList(data?.shopOrderList)
            }

        }).catch(err => console.log(err));
        const rerenderStats = setInterval(() => {
            getSellIngameList(getFormData(selectTypeIngame)).then(res => {
                if (res?.data?.data) {
                    const data = res.data.data;
                    setSellIngameList(data.shopOrderList)
                }
            });
        }, 60000);
        return () => {
            clearInterval(rerenderStats)
            setSellIngameList([])
        }

    }, [selectTypeIngame])
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div className="statistical">
                    <Table className="priceToken" sx={{ color: '#fff' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4}>Token Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className='tokenPrice'>RACA</TableCell>
                                <TableCell className='tokenPrice'>ELMON</TableCell>
                                <TableCell className='tokenPrice'>ELCOIN</TableCell>
                                <TableCell className='tokenPrice'>BTC </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    {raca}
                                </TableCell>
                                <TableCell>
                                    {elmon}
                                </TableCell>
                                <TableCell>
                                    {elcoin}
                                </TableCell>
                                <TableCell>
                                    {numberWithCommas(btc)}
                                </TableCell>
                            </TableRow>

                        </TableBody>

                    </Table>
                    <SwapRacaToUSD />
                    <p id='timeUpdated'>{timeUpdated}</p>
                    <div className='pricetable'>
                        <TableContainer className='table-scroll' component={Paper}>
                            <Table className='tablePrice' aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">
                                            <img width='50px' height='50px' src='/raca/metamon.png' alt='Metamon' />
                                        </TableCell>
                                        <TableCell align="center">
                                            <img width='50px' height='50px' src='/raca/MetamonEgg.png' alt='Egg' />
                                        </TableCell>
                                        <TableCell align="center">
                                            <img width='50px' height='50px' src='/raca/DiamondYellow.png' alt='DiamondYellow' />
                                        </TableCell>
                                        <TableCell align="center">
                                            <img style={{ objectFit: 'contain' }} width='50px' height='50px' src='/raca/potion.png' alt='Potion' />
                                        </TableCell>
                                        <TableCell align="center">
                                            <FormControl className='select-ingame'>
                                                <Select
                                                    size='small'
                                                    labelId="select-ingame"
                                                    id="select-ingame"
                                                    value={selectTypeIngame}
                                                    onChange={handleChangeSelectSellIngame}
                                                    sx={{ color: '#fff', padding: 0 }}
                                                    className='select-stats'
                                                    ref={refSelect}>
                                                    {selectIngameList && selectIngameList.map((item, index) => (
                                                        <MenuItem key={item.type} value={item.type}>
                                                            <img style={{ objectFit: 'contain' }} width='50px' height='50px' src={`/raca/${item.img}`} alt={item.name} />
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            {/* <img style={{ objectFit: 'contain' }} width='50px' height='50px' src='/valhalla.png' alt='valhalla' /> */}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {priceMarketList.length !== 0 && [...Array(5).keys()].map((_, index) => (
                                        <TableRow key={index + 1}>
                                            <TableCell align="center" sx={{ borderLeft: '1px solid' }}>{index + 1}</TableCell>
                                            <TableCell align="center">{millify(Math.floor(priceMarketList["Metamon"][index]?.fixed_price))} (~{(tokenPrice * priceMarketList["Metamon"][index]?.fixed_price).toFixed(2)})</TableCell>
                                            <TableCell align="center">{numberWithCommas(Math.floor(priceMarketList["Metamon Egg"][index]?.fixed_price))} (~{(tokenPrice * priceMarketList["Metamon Egg"][index]?.fixed_price).toFixed(2)})</TableCell>
                                            <TableCell align="center">{numberWithCommas(Math.floor(priceMarketList["Yellow Diamond"][index]?.fixed_price))} (~{(tokenPrice * priceMarketList["Yellow Diamond"][index]?.fixed_price).toFixed(2)})</TableCell>
                                            <TableCell align="center">{numberWithCommas(Math.floor(priceMarketList["Potion"][index]?.fixed_price))} (~{(tokenPrice * priceMarketList["Potion"][index]?.fixed_price).toFixed(2)})</TableCell>
                                            <TableCell align="center">{sellIngameList.length !== 0 ? `${numberWithCommas(Math.floor(sellIngameList[index]?.amount))} (~${(tokenPrice * sellIngameList[index]?.amount).toFixed(2)})` : 0}</TableCell>
                                        </TableRow>
                                    )
                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>

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
                                <img width='50px' height='50px' className='symbols' src='/raca/MetamonEgg.png' alt='Egg' />
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
                                            {eggStatsList?.length !== 0 && eggStatsList.map((item, index) => {
                                                return (
                                                    <TableRow key={index + 1}>
                                                        <TableCell align="center" sx={{ borderLeft: "1px solid" }}>{index + 1}</TableCell>
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
                                <img width='50px' height='50px' style={{ objectFit: 'contain' }} className='symbols' src={`/raca/${selectStatsList.filter(item => item.id === selectStats)[0].img}`} alt={selectStatsList.filter(item => item.id === selectStats)[0].name} />
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
                                            {selectedStatsList?.length !== 0 && selectedStatsList.map((item, index) => {
                                                return (
                                                    <TableRow key={index + 1}>
                                                        <TableCell align="center" sx={{ borderLeft: "1px solid" }}>{index + 1}</TableCell>
                                                        <TableCell align="center" style={{ paddingLeft: '1px' }}>{millify(Math.floor(item?.fixed_price / item.count))}</TableCell>
                                                        {Number(selectStats) === 13 ? (
                                                            <TableCell className="info-metamon-cell" padding='none'>
                                                                <Typography sx={{ color: '#fff', fontSize: '12px' }}>{item.level}</Typography>
                                                                <Typography sx={{ color: '#fff', fontSize: '12px' }}>{item.score}</Typography>
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


                </div>

            </Box>
            {priceMarketList.length !== 0 && (
                <Box className="cards">
                    <Box className="card ">
                        <Card nft={priceMarketList["MetamonR"][0]} />
                    </Box>
                    <Box className="card ">
                        <Card nft={priceMarketList["Big Green"][0]} />
                    </Box>
                    <Box className="card ">
                        <Card nft={priceMarketList["Musk USM Land"][0]} />
                    </Box>
                    <Box className="card ">
                        <Card nft={priceMarketList["Kiss-up State Land"][0]} />
                    </Box>
                </Box>
            )}
            <StatsChart />
        </Box>

    );
}
export default NFTs;