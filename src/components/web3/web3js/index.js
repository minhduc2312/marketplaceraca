import React, { useContext, useEffect, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import MarketHistory from './StatsMarket/MarketHistory';
import Metamask from '../web3/Metamask';
import StatWallet from './StatsWallet/StatWallet';
import { useTransition, animated } from 'react-spring'
import { AppContext } from '../../../context/AppContext';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../../config';
import { useDispatch } from 'react-redux';
import { initApp } from '../../../app/actions';
import { getFirestore } from "firebase/firestore"
import { TradingToken } from '../Trading/TradingToken';
import TradingNFT from '../Trading/TradingNFT';

const Portfolio = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const dispatch = useDispatch()
    const [value, setValue] = useState('4');
    const { currentAccount } = useContext(AppContext);
    const transition = useTransition(value, {
        from: { x: -500, y: 10, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1, display: 'block' },
        leave: { x: 500, y: 10, opacity: 0, display: 'none' }
    })
    useEffect(() => {
        dispatch(initApp(db));
    }, [db])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className="portfolio">
            <Metamask />
            {currentAccount && (
                <TabContext value={value}>
                    <Box >
                        <TabList
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            sx={[{
                                '& .MuiButtonBase-root': {
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: '#fff'
                                },
                                '& .Mui-selected': {
                                    fontSize: 16
                                }
                            }]}

                            className='tabs-metamask'
                            centered>
                            <Tab color='#fff' value="1" label="Stats Wallet" />
                            <Tab color='#fff' value="2" label="Market Place" />
                            <Tab color='#fff' value="3" label="Trading Token" />
                            <Tab color='#fff' value="4" label="Trading NFT" />
                        </TabList>
                    </Box>
                    {transition((style, item) => {
                        switch (item) {
                            case "1":
                                return <animated.div style={style}>
                                    <TabPanel value="1"><StatWallet /></TabPanel>
                                </animated.div>
                            case "2":
                                return <animated.div style={style}>
                                    <TabPanel value="2"><MarketHistory /></TabPanel>

                                </animated.div>
                            case "3":
                                return <animated.div style={style}>
                                    <TabPanel value="3"><TradingToken /></TabPanel>
                                </animated.div>
                            case "4":
                                return <animated.div style={style}>
                                    <TabPanel value="4"><TradingNFT /></TabPanel>
                                </animated.div>
                            default:
                                return
                        }
                    })}
                </TabContext>
            )
            }

        </Box>
    );
}

export default Portfolio;