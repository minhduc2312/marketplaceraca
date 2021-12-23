import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SwapRacaToUSD from "./SwapRaca";

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
            getAPI(20, 1).then(res =>
                setKissUpLand(res.data.list[0])
            ),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=radio-caca&vs_currencies=usd')
                .then(res => {
                    document.title = res.data['radio-caca'].usd + " - Marketplace RACA"
                    setTokenPrice(res.data['radio-caca'].usd)
                })
        ])

    }

    useEffect(() => {
        getData();
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
        //     console.log(response)
        //     const formData1 = new FormData();
        //     formData1.append('address', '0x769ba0cb0d89666f7506194d2cf416ea0f812e16')
        //     axios({
        //         method: 'POST',
        //         url: 'https://metamon-api.radiocaca.com/usm-api/checkBag',
        //         data: formData1,
        //         headers: {
        //             "accessToken": response.data.data
        //         }
        //     }).then(function (response) {
        //         console.log(response);
        //     })
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        setInterval(() => {
            getData();
        }, 20000)

        return () => {
            setListMetamon([])
            setListDiamond([])
            setListEgg([])
            setListPotion([])
            setKissUpLand({})
            setTokenPrice(0)
            clearInterval(() => {
                getData();
            }, 20000);
        }
    }, []);

    return (
        <div hidden={hidden}>
            <p id='tokenPrice'>RACA Price: {tokenPrice}</p>
            <SwapRacaToUSD priceRaca={tokenPrice} />
            <div id='table-scroll'>
                <table id='tablePrice'>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Metamon</th>
                            <th scope="col">Egg</th>
                            <th scope="col">Yellow Diamon</th>
                            <th scope="col">Potion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEgg && listMetamon && listDiamond && listPotion && listEgg.map((child, index) => {
                            return (
                                <tr key={index + 1}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{numberWithCommas(listMetamon[index]?.fixed_price)} (~{(tokenPrice * listMetamon[index]?.fixed_price).toFixed(2)})</td>
                                    <td>{numberWithCommas(listEgg[index]?.fixed_price)} (~{(tokenPrice * listEgg[index]?.fixed_price).toFixed(2)})</td>
                                    <td>{numberWithCommas(listDiamond[index]?.fixed_price)} (~{(tokenPrice * listDiamond[index]?.fixed_price).toFixed(2)})</td>
                                    <td>{numberWithCommas(listPotion[index]?.fixed_price)} (~{(tokenPrice * listPotion[index]?.fixed_price).toFixed(2)})</td>
                                </tr>)
                        })
                        }
                    </tbody>
                </table>
            </div>
            <div className="cards">
                {listEgg && listMetamon && listDiamond && listPotion &&
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
                {listEgg && listMetamon && listDiamond && listPotion &&
                    (
                        <React.StrictMode>
                            <div className="card">
                                {listEgg[0] && <Card nft={listEgg[0]}></Card>}
                            </div>
                            <div className="card">
                                {listDiamond[0] && <Card nft={listDiamond[0]}></Card>}
                            </div>
                            <div className="card">
                                {listPotion[0] && <Card nft={listPotion[0]}></Card>}
                            </div>
                            <div className="card">
                                {kissUpLand && <Card nft={kissUpLand}></Card>}
                            </div>
                        </React.StrictMode>

                    )}
            </div>

        </div>
    );
}
export default PriceTable;