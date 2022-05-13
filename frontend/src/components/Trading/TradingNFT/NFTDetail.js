import { Typography, Box, styled, Button } from '@mui/material'
import React from 'react'


const BoxPriceSection = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 10px 10px 10px;
`;
const TypographyPrice = styled(Typography)`
    font-weight: 600; 
    font-size: '14px'; 
    line-height: '32px'
`
const NFTDetail = ({ nft }) => {
    return (
        <Box className="nft__detail" sx={{
            color: '#383838',
            width: '100%',
            border: '1px solid rgba(56,56,56,.1)',
            borderRadius: '10px',
            boxShadow: ' 0 0 2px 0px #383838',
            paddingBottom: '10px'
        }}>
            <Box className="nft__section img">
                <a target='_blank' href={`https://market.radiocaca.com/#/market-place/${nft.id}`}><img width='100%' alt={nft.name} src={nft.image_url} /></a>
            </Box>
            <Box className="nft__section info">
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: '32px', textAlign: 'left', paddingLeft: '10px' }}>
                        {nft.name} #{nft.id} <Typography variant='span'>
                            x{nft.count}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
            <Box className="separate" sx={{ width: '80%', border: '0.5px solid #38383852', display: 'inline-block' }}></Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <BoxPriceSection >
                    <Typography className="price__left">
                        Fixed price
                    </Typography>
                    <Typography className="price__right">
                        <span role="img" class="anticon logo___1_qoR" >
                            <img style={{ margin: '0px 10px 5px 0px' }} height="16px" width="16px" src='/raca-icon.svg' alt='price icon' />
                        </span>
                        {nft.fixed_price}
                    </Typography>
                </BoxPriceSection>
                <BoxPriceSection >
                    <Typography className="price__left">
                        Total price
                    </Typography>
                    <Typography className="price__right">
                        <span role="img" class="anticon logo___1_qoR">
                            <img style={{ margin: '0px 10px 5px 0px' }} height="16px" width="16px" src='/raca-icon.svg' alt='price icon' />
                        </span>
                        {Math.floor(nft.fixed_price * nft.count)}
                    </Typography>
                </BoxPriceSection>
            </Box>
            <Button sx={{ backgroundColor: '#fcc33c' }}>Buy Now</Button>
        </Box>
    )
}

export default NFTDetail