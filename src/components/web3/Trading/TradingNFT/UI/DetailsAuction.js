import { Box, Button, Typography } from '@mui/material'
import millify from 'millify'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBalanceRaca } from '../../../../../app/actions'
import { numberWithCommas } from '../../../../helper/numberWithCommas'
import { buyNFT } from '../Action/buyNFT'
import { getBalanceRaca } from '../Action/getBalanceRaca'
import { useMediaQuery } from '@mui/material'
import axios from 'axios'
const DetailsAuction = ({ log }) => {
    const dispatch = useDispatch();
    const [infoMetamon, setInfoMetamon] = useState();

    useEffect(() => {
        if (log.nftAddress === '0xF24Bf668Aa087990f1d40aBAbF841456E771913c') {
            const getDataMetamon = setInterval(() => {
                axios.get(`https://market-api.radiocaca.com/nft-sales?tokenId=${log.tokenId}`)
                    .then(res => {
                        if (res.data.list[0]) {
                            setInfoMetamon(res.data.list[0])
                            clearInterval(getDataMetamon)
                        }
                    }
                    )
            }, 2000)

        }

        return () => {
        }
    }, [])

    const matches = useMediaQuery('(min-width:400px)')
    const eventBuyNFT = (auctionID, price) => {
        try {
            buyNFT(auctionID, price).then(async () => {
                const balance = await getBalanceRaca()
                dispatch(setBalanceRaca(balance))
            })
        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <Box sx={[{ border: '1px solid #33333373', borderRadius: '5px', padding: '10px', marginBottom: '10px', boxShadow: '0px 0px 5px 0px #33333373' },
        matches ? { display: 'flex', alignItems: 'center' } : {}
        ]}>
            <Box width={'100%'}>
                <Box display='flex' justifyContent='space-around'>
                    <Box display='flex' flexDirection='column' textAlign={'left'}>
                        <Typography sx={{
                            width: '160px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}>
                            {`Name: ${log.nameNFT}`}
                        </Typography>
                        <Typography>
                            {`TokenID: ${log.tokenId}`}
                        </Typography>

                        <Typography>
                            {`Date: ${log.time}`}
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' textAlign={'left'}>
                        <Typography>
                            {`Count: ${log.count}`}
                        </Typography>

                        <Typography>
                            {`Fixed: ${millify(log.average)}`}
                        </Typography>
                        <Typography>
                            {`Total: ${millify(log.total)}`}
                        </Typography>
                    </Box>
                </Box>

                {infoMetamon ?
                    (<Typography alignItems={'center'}>{`Score: ${infoMetamon.score} - Level: ${infoMetamon.level}`}</Typography>)
                    : ''}

            </Box>
            <Button onClick={() => eventBuyNFT(log.auctionsID, log.total)}
                sx={[
                    {
                        '&:hover': {
                            backgroundColor: 'rgb(255 179 0)',
                        }
                    },
                    { backgroundColor: '#fcc33c', fontWeight: '700' }
                ]}>Buy</Button>
        </Box>
    )
}

export default memo(DetailsAuction)