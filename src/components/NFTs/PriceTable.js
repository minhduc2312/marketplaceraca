import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SwapRacaToUSD from "./SwapRaca";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../../styles/nfts.css';



const getAPI = (categoryId, size) => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageSize=${size}&sortBy=fixed_price&order=asc&category=${categoryId}&tokenId=-1`, {
        "Access- Control - Allow - Origin": "*"
    });
}



export function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PriceTable = ({ hidden }) => {
    const [listMetamon, setListMetamon] = useState([]);
    const [listDiamond, setListDiamond] = useState([]);
    const [listEgg, setListEgg] = useState([]);
    const [listPotion, setListPotion] = useState([]);
    const [kissUpLand, setKissUpLand] = useState({});
    const [tokenPrice, setTokenPrice] = useState(0);
    const [timeUpdated, setTimeUpdated] = useState("")

    const convertDateTime = () => {
        const now = new Date();
        setTimeUpdated(now.toLocaleString())
    }

    const getData = async () => {
        Promise.all([
            getAPI(13, 1000).then(res =>
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
            getAPI(20, 1).then(res => {
                setKissUpLand(res.data.list[0]);
                document.querySelector('.loading')?.classList.toggle('loading');
            }),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=radio-caca&vs_currencies=usd')
                .then(res => {
                    document.title = res.data['radio-caca'].usd + " - Marketplace RACA"
                    setTokenPrice(res.data['radio-caca'].usd)
                })
        ])

    }

    useEffect(() => {
        getData();
        convertDateTime()
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
        const redender = setInterval(() => {
            getData();
            convertDateTime();
        }, 20000)

        return () => {
            setListMetamon([])
            setListDiamond([])
            setListEgg([])
            setListPotion([])
            setKissUpLand({})
            setTokenPrice(0)
            clearInterval(redender);
        }
    }, []);

    return (
        <div hidden={hidden}>
            <p id='tokenPrice'>RACA Price: {tokenPrice}</p>
            <SwapRacaToUSD priceRaca={tokenPrice} />
            <p id='timeUpdated'>{timeUpdated}</p>
            <div class='pricetable'>
                <TableContainer id='table-scroll' component={Paper}>
                    <Table id='tablePrice' aria-label="simple table">
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


            <div className="cards">
                {listMetamon[0] &&
                    <React.StrictMode>
                        <div className="card">
                            {listMetamon[0] && <Card nft={listMetamon[0]}></Card>}
                        </div>
                        <div className="card">
                            {listMetamon[1] && <Card nft={listMetamon[1]}></Card>}
                        </div>
                        <div className="card">
                            {listMetamon[2] && <Card nft={listMetamon[2]}></Card>}
                        </div>
                        <div className="card">
                            {listMetamon[3] && <Card nft={listMetamon[3]}></Card>}
                        </div>
                    </React.StrictMode>
                }


                {listEgg[0] &&
                    <div className="card">
                        <Card nft={listEgg[0]}></Card>
                    </div>}

                {listDiamond[0] &&
                    <div className="card">
                        <Card nft={listDiamond[0]} />
                    </div>}

                {listPotion[0] &&
                    <div className="card">
                        <Card nft={listPotion[0]} />
                    </div>}

                {kissUpLand &&
                    <div className="card loading"><Card nft={kissUpLand}></Card>
                    </div>}

            </div>
        </div>
    );
}
export default PriceTable;