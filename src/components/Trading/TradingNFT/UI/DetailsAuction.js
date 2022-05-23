import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setBalanceRaca } from '../../../../app/actions'
import { numberWithCommas } from '../../../helper/numberWithCommas'
import { buyNFT } from '../buyNFT'
import { getBalanceRaca } from '../getBalanceRaca'

const DetailsAuction = ({ log }) => {
    const dispatch = useDispatch();
    const eventBuyNFT = (auctionID, price) => {
        buyNFT(auctionID, price).then(async () => {
            const balance = await getBalanceRaca()
            dispatch(setBalanceRaca(balance))
        })
    }
    return (
        <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', height: '72px', border: '1px solid #33333373', borderRadius: '5px', padding: '10px', marginTop: '10px', boxShadow: '0px 0px 5px 1px #33333373', justifyContent: 'center' }}>
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
            <Typography>
                {`Count: ${log.count}`}
            </Typography>
            <Typography>
                {`Fixed: ${numberWithCommas(log.average)}`}
            </Typography>
            <Typography>
                {`Total: ${numberWithCommas(log.total)}`}
            </Typography>
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

export default DetailsAuction