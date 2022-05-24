import { Typography, Box, styled, Button } from '@mui/material'
import React from 'react'
import { numberWithCommas } from '../../../NFTs/Card';
import { buyNFT } from '../buyNFT'
import millify from "millify";
import { useSelector } from 'react-redux';

const BoxPriceSection = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 5px 10px 5px
`;
const TypographyPrice = styled(Typography)`
    font-weight: 600; 
    font-size: 14px; 
    
`

const NFTDetail = ({ nft, handleBuyNFT }) => {
    const { raca } = useSelector(prev => prev.price)
    return (
        <Box className="nft__detail" sx={{
            color: '#383838',
            width: '100%',
            border: '1px solid rgba(56,56,56,.1)',
            borderRadius: '10px',
            boxShadow: ' 0 0 5px 0px #383838',
            paddingBottom: '10px',
            transitionDuration: '2s',

        }}>
            <Box className="nft__section img" position='relative'>
                {Number(nft.category_id) === 13 && (
                    <Box className="label__properties"
                        sx={{
                            position: 'absolute',
                            top: '16px',
                            left: -1,
                            width: '68px',
                            height: '48px',
                            background: `url(${process.env.PUBLIC_URL}/bg-properties.png) 100% no-repeat`,
                            paddingLeft: '4px',
                            boxSizing: "borderBox",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#fff'
                        }}>
                        <Box className='label__item' sx={{ textAlign: 'left' }}>
                            <span role="img" className="anticon icon___SS8zY">
                                <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" >
                                    <use xlinkHref="#icon-level1"></use>
                                </svg>
                            </span>
                            <span>{nft.level}</span>
                        </Box>
                        <Box className='label__item' sx={{ textAlign: 'left' }}>
                            <span role="img" className="anticon icon___SS8zY">
                                <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" >
                                    <use xlinkHref="#icon-ghost"></use>
                                </svg>
                            </span>
                            <span>{nft.score}</span>
                        </Box>
                    </Box>
                )}

                <a target='_blank' href={`https://market.radiocaca.com/#/market-place/${nft.id}`}><img className='nft__img' alt={nft.name} src={nft.image_url} style={{ borderRadius: '10px', width: '100%' }} /></a>
            </Box>
            <Box className="nft__textBox">
                <Box className="nft__section info">
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: '32px', textAlign: 'left', paddingLeft: '10px' }}>
                            {nft.name} #{nft.id}
                            <Typography variant='span' sx={{
                                display: "inlineBlock",
                                padding: "2px 6px",
                                color: 'rgb(252 195 60)',
                                fontSize: '14px',
                                lineHeight: '16px',
                                background: 'rgb(252 195 60 / 20%)',
                                borderRadius: '10px',
                            }}>
                                x{nft.count}
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
                <Box className="separate" sx={{ width: '80%', border: '0.5px solid #38383852', display: 'inline-block' }}></Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 5px' }}>
                    <BoxPriceSection >
                        <TypographyPrice className="price__left">
                            Fixed price
                        </TypographyPrice>
                        <TypographyPrice className="price__right">
                            <span role="img" className="logo___1_qoR" >
                                <img style={{ margin: '0px 5px 5px 0px' }} height="16px" width="16px" src={`${process.env.PUBLIC_URL}/raca-icon.svg`} alt='price icon' />
                            </span>
                            {`${millify(nft.fixed_price / nft.count, { precision: 3, })} (~${(nft.fixed_price * raca) <= 0 ? Math.f(nft.fixed_price / nft.count * raca).toFixed(2) : Math.floor(nft.fixed_price / nft.count * raca)} $)`}
                        </TypographyPrice>
                    </BoxPriceSection>
                    <BoxPriceSection >
                        <TypographyPrice className="price__left">
                            Total price
                        </TypographyPrice>
                        <TypographyPrice className="price__right">
                            <span role="img" className="logo___1_qoR">
                                <img style={{ margin: '0px 5px 5px 0px' }} height="16px" width="16px" src={`${process.env.PUBLIC_URL}/raca-icon.svg`} alt='price icon' />
                            </span>
                            {`${millify(nft.fixed_price, { precision: 3, })} (~${(nft.fixed_price * raca) <= 0 ? (nft.fixed_price * raca).toFixed(2) : Math.floor(nft.fixed_price * raca)} $)`}
                        </TypographyPrice>
                    </BoxPriceSection>
                </Box>
                <Button onClick={(e) => handleBuyNFT(e,nft.id_in_contract, nft.fixed_price)} sx={[
                    {
                        '&:hover': {
                            backgroundColor: 'rgb(255 179 0)',
                        }
                    },
                    { backgroundColor: '#fcc33c', fontWeight: '700' }
                ]}>Buy Now</Button>
            </Box>

            <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <symbol id="icon-level1" viewBox="0 0 1024 1024">
                    <path d="M806.528 646.144a37.824 37.824 0 0 0-36.16-25.152H626.24l-45.696-149.12a37.248 37.248 0 0 0-35.584-26.24 38.72 38.72 0 0 0-36.992 27.52l-45.696 147.84H318.144a37.888 37.888 0 0 0-36.16 25.152c-5.12 15.104 0 31.36 13.312 41.6l118.4 89.152-45.312 147.2a38.144 38.144 0 0 0 59.264 42.112l116.608-88.768 116.672 88.384a38.848 38.848 0 0 0 53.504-7.808 38.016 38.016 0 0 0 5.632-34.176l-45.184-145.92 118.592-90.368c13.056-10.048 18.176-26.24 13.056-41.408z m89.984-358.336V108.032A43.776 43.776 0 0 0 853.12 64H235.456A43.776 43.776 0 0 0 192 108.032v179.84a44.032 44.032 0 0 0 32.128 42.496l308.864 84.416a42.24 42.24 0 0 0 22.592 0l308.8-84.416a44.032 44.032 0 0 0 32.128-42.56z" fill="#FFFFFF"></path>
                    <path d="M705.728 279.168a24.32 24.32 0 0 0 24.256-24.32V166.784a24.32 24.32 0 0 0-48.576 0v88.064a24.32 24.32 0 0 0 24.32 24.32z m-322.944 0a24.32 24.32 0 0 0 24.32-24.32V166.784a24.32 24.32 0 1 0-48.576 0v88.064a24.32 24.32 0 0 0 24.32 24.32z" fill="#FCC33C"></path>
                </symbol>
                <symbol id="icon-ghost" viewBox="0 0 1024 1024">
                    <path d="M213.76 341.12C245.376 162.752 342.976 64 514.24 64c172.736 0 266.432 113.92 295.68 289.28 17.856-33.536 57.92-93.632 88.576-90.048 39.68 4.608 76.992 29.76 54.976 48a48.192 48.192 0 0 1-18.176 8.896c-14.848 4.608-29.632 9.216-50.176 66.24-15.232 42.24-42.24 79.424-65.088 105.088 1.152 145.024 40.576 213.184 66.432 257.92 17.216 29.76 28.416 49.088 18.112 73.856-17.536 42.048-70.912 28.416-99.328 11.904-3.392 45.952-36.48 81.984-76.928 81.984-23.68 0-44.928-12.416-59.072-32-6.848 42.496-42.624 74.88-85.632 74.88-27.264 0-51.648-12.992-67.584-33.344-15.872 20.352-40.256 33.344-67.52 33.344-43.072 0-78.72-32.384-85.632-74.88-14.208 19.584-35.392 32-59.136 32-42.624 0-77.184-40.192-77.184-89.792v-2.752c-20.8 36.992-95.04 32.896-102.72-22.848-3.328-23.872 7.424-45.632 21.952-75.072 23.36-47.296 56.448-114.304 56.448-241.664l0.064-10.432c-21.76-23.808-45.568-56-60.352-92.544-22.528-55.744-37.504-59.584-52.48-63.424-6.016-1.536-12.032-3.072-18.496-7.936-22.656-17.024 13.824-44.096 53.312-50.752 29.312-4.992 69.44 48.256 89.472 81.28z m329.984-36.8c3.84-8.512 134.272-73.472 143.232-67.84 8.896 5.568-17.984 73.28-61.504 85.76-34.816 11.008-87.296-5.632-81.728-17.92z m-208.448-67.84c8.96-5.632 139.328 59.328 143.232 67.84 5.568 12.288-46.912 28.928-81.728 17.92-43.52-12.48-70.4-80.192-61.44-85.76z m160.896 182.016c-33.984 0-77.312-17.088-107.072-31.744-6.08-3.008-12.8 4.224-9.216 9.92l38.848 61.632a6.4 6.4 0 0 0 7.808 2.56l28.864-11.52a6.4 6.4 0 0 1 6.4 0.96l30.4 24.064a6.4 6.4 0 0 0 7.936 0l30.4-24.064a6.4 6.4 0 0 1 6.4-0.96l29.504 11.712a6.4 6.4 0 0 0 7.296-1.792l47.232-56.128c4.608-5.568-3.2-15.744-9.92-13.056-34.752 13.76-83.456 28.416-114.88 28.416z" fill="#FFFFFF"></path>
                </symbol>

            </svg>
        </Box>
    )
}

export default NFTDetail