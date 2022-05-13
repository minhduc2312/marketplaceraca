const { default: axios } = require("axios");
const e = require("express");

const NFTList = [
    {
        name: 'Metamon Egg',
        id: 17,
    },
    {
        name: 'Metamon',
        id: 13,
    },
    {
        name: 'Yellow Diamond',
        id: 16,
    },
    {
        name: 'Potion',
        id: 15,
    },
    {
        name: 'MetamonR',
        id: 23,
    },
    {
        name: 'Big Green',
        id: 46,
    },
    {
        name: 'Musk USM Land',
        id: 7,
    },
    {
        name: 'Kiss-up State Land',
        id: 20,
    },


]

const getDataMarket = (categoryId = '', size = '') => {
    return axios(`https://market-api.radiocaca.com/nft-sales?pageSize=${size}&sortBy=fixed_price&order=asc&category=${categoryId}&tokenId=-1`, {
        "Access-Control-Allow-Origin": "*"
    });
}

exports.getNFTsPrice = async (req, res, next) => {
    try {
        if (req.params?.id) {
            res.status(200).json(await getDataMarket(req.params.id, 10).then(res=>{
                return res.data.list
            }))
            console.log(req.params.id)
        } else {
            const getData = async () => {
                return await Promise.all(NFTList.map(async ({ name, id }) => {
                    return await getDataMarket(id, 5).then(res => {
                        return {
                            [name]: res.data.list
                        }
                    })
                }))
            }
            res.status(200).json(await getData().then(res => res))
        }
    } catch (error) {
        console.log(error)
    }
   

}
exports.getNFTsStats = async (req, res, next) => {
    try {
        const getDataStats = async (categoryId = '', pageSize = 10) => {
            let tokenId;
            if (Number(categoryId) === 15 || Number(categoryId) === 16) {
                tokenId = 0
            } else {
                tokenId = -1
            }
            return await axios(`https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=${pageSize}&status=executed&tokenId=${tokenId}&category=${categoryId}`, {
                "Access-Control-Allow-Origin": "*"
            }).then(res => res.data.list).catch(err => {
                return ({
                    code: 400,
                    message: err
                })
            });
        }
        const getData = await getDataStats(req.params.id, req.params.size || 10)

        return res.status(200).json(getData)
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err
        })
    }

}