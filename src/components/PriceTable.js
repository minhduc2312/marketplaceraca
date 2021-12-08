import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import SwapRacaToUSD from "./SwapRaca";

const getAPI = async (categoryId, size) => {
    return await axios(`https://market-api.radiocaca.com/nft-sales?pageSize=${size}&sortBy=fixed_price&order=asc&category=${categoryId}&tokenId=-1`);
}

const getPriceRaca = async () => {
    return await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=radio-caca&vs_currencies=usd')
}

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PriceTable = () => {
    const [listMetamon, setListMetamon] = useState([]);
    const [listDiamond, setListDiamond] = useState([]);
    const [listEgg, setListEgg] = useState([]);
    const [listPotion, setListPotion] = useState([]);
    const [kissUpLand, setKissUpLand] = useState({});
    const [tokenPrice, setTokenPrice] = useState(0);

    const getData = () => {
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
                .then(res => setTokenPrice(res.data['radio-caca'].usd))
        ])
    }
    useEffect(() => {
        getData();
        setInterval(async () => {
            let res = await getPriceRaca();
            let data = res.data['radio-caca'].usd;
            setTokenPrice(data);

        }, 20000)

        return () => {
            clearInterval(async () => {
                const res = await getPriceRaca();
                const data = res.data['radio-caca'].usd
                setTokenPrice(data);
            }, 20000);
        }
    }, [])
    return (
        <div>
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