import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import InputFilters from './InputFilters';
import '../../styles/elemon.css';
import { Box, CircularProgress, Grid } from '@mui/material';
import InfoCard from './InfoCard';
import { useDispatch, useSelector } from 'react-redux';
import { handlePower } from '../../app/actions';


const getElemonItem = (pageNumber = 1, pageSize = 20, priceMode = 2, baseCardId, tokenId, rarities, classes, purities) => {
    return axios.get(`https://app.elemon.io/market/getElemonItems?pageNumber=${pageNumber}&pageSize=${pageSize}&positionType=2&priceMode=${priceMode}&baseCardId=&tokenId=&rarities=&classes=&purities=`).then(res => res.data, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}
const getElemonInfo = (listElemon) => {
    const listTokenId = listElemon.map(item => item.tokenId);
    return axios.get(`https://app.elemon.io/elemon/GetElemonInfo?tokenId=${listTokenId?.join(',')}`).then(res => res.data, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).catch(error => (error));
}

const Elemon = () => {
    const [listElemon, setListElemon] = useState([]);
    const [listElemonInfo, setListElemonInfo] = useState([]);
    const [timeUpdated, setTimeUpdated] = useState("")
    const [loading, setLoading] = useState(true);
    const [listFilter, setListFilter] = useState([]);
    const [myNFT, setMyNFT] = useState();
    const { min, max, sort, name, tokenId } = useSelector(state => state.filtersElemon)

    const dispatch = useDispatch();
    const convertDateTime = () => {
        const now = new Date();
        setTimeUpdated(now.toLocaleString())
    }
    useEffect(() => {
        const getData = async () => {
            await getElemonItem(1, 100).then(async (res) => {
                await getElemonItem(1, res.paging.totalCount).then(res => setListElemon(res.data));
            });
        }
        getData();
        convertDateTime()

        return () => {
            setListElemon([]);
        }
    }, [])

    React.useEffect(() => {
        const getInfo = async () => {
            setLoading(true)
            const size = 250;
            const lengthList = listElemon.length;
            const loop = lengthList % size === 0 ? lengthList / size : lengthList / size + 1;
            for (let i = 1; i <= loop; i++) {
                const amount = lengthList % size !== 0 && lengthList - (i * size) < 0 ? ((i - 1) * size) + (lengthList % size) : i * size
                await getElemonInfo(listElemon?.slice((i - 1) * size, amount)).then(res => {
                    const listInfo = listElemon.slice((i - 1) * size, amount).map((item, index) => {
                        try {
                            if (item.ownerAddress === '0x10201091597635eC7b8e208306E6aDCC7c167925' && index != undefined) {
                                item.point = res.data[index]?.point;
                                dispatch(handlePower({ minPower: item.point - (item.point % 100000 + 50000), maxPower: max }))
                                setMyNFT(item);
                            }
                            return {
                                ...item,
                                point: res?.data[index]?.point,
                            }
                        }
                        catch (err) {
                            console.log(err)
                        }
                    });
                    setListElemonInfo(pre => pre.concat(listInfo))
                })
            }

            setLoading(false);
        }
        getInfo();
        return () => {
            setListElemonInfo([]);
        }
    }, [listElemon]);
    useEffect(() => {
        const filter = listElemonInfo.filter(elemon => {
            let maxP = max;
            let minP = min;
            if (tokenId) {
                return elemon.tokenId == tokenId;
            } else {
                const checkPower = (power, type) => {
                    if (!power)
                        return true;
                    return type == 1 ? elemon?.point >= power : elemon?.point <= power
                }
                if (Number(name) !== 0) {
                    return checkPower(minP, 1) && checkPower(maxP, 2) && elemon.baseCardId == name;
                }
                return checkPower(minP, 1) && checkPower(maxP, 2)
            }
        }).sort((a, b) => {
            switch (Number(sort)) {
                case 0:
                    return a.lastPrice >= b.lastPrice ? 1 : -1;
                case 1:
                    return a.lastPrice <= b.lastPrice ? 1 : -1;
                case 2:
                    return a.point >= b.point ? 1 : -1;
                case 3:
                    return a.point <= b.point ? 1 : -1;
                default:
                    break;
            }
        })

        setListFilter(filter)
        return () => {
            setListFilter([])
        }
    }, [loading, min, max, sort, name, tokenId]);


    return (
        <Box>
            <Box sx={{ textAlign: 'center' }}>
                <InputFilters />
                <p className='timeUpdate'>{timeUpdated}</p>
                <Grid container spacing={1}>
                    {myNFT && (
                        <Grid item xs={6} md={4} lg={2.2}>
                            <InfoCard elemon={myNFT} />
                        </Grid>
                    )}

                    {listFilter && listFilter?.slice(0, 100).map((item, index) => (
                        <Grid key={index} item xs={6} md={4} lg={2.2}>
                            <InfoCard elemon={item} />
                        </Grid>
                    ))}
                </Grid>
                {loading && <CircularProgress />}
            </Box>
        </Box>
    );
};

export default Elemon;
