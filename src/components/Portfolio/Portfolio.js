import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';

import MarketHistory from './MarketHistory';
import Metamask from '../Metamask';
import StatWallet from './StatWallet';
import { useTransition, animated } from 'react-spring'
import { AppContext } from '../../context/AppContext';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../config';np

const Portfolio = () => {
    const app = initializeApp(firebaseConfig);
    
    console.log(app)
    const { currentAccount } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(true);
    const transition = useTransition(isVisible, {
        from: { x: -500, y: 10, opacity: 0 },
        enter: { x: 0, y: 10, opacity: 1, display: 'block' },
        leave: { x: 500, y: 10, opacity: 0, display: 'none' }
    })
    const handleSwitch = () => {
        setIsVisible(state => !state)
    }
    return (
        <div className="portfolio">
            <Metamask />
            {currentAccount && (
                <React.StrictMode>
                    <Button sx={{ height: '100%', color: '#fff', background: 'rgb(253 186 28 / 92%)', padding: '5px 10px' }} variant="contained" onClick={handleSwitch}>{isVisible ? "Stat Raca" : "Portfolio"}</Button>
                    {transition((style, item) =>
                        item ? <animated.div style={style}>
                            <StatWallet />
                        </animated.div> : <animated.div style={style}>
                            <MarketHistory />
                        </animated.div>
                    )}
                </React.StrictMode>
            )}

            {/* {currentAccount && <MarketHistory />}
            {currentAccount && <StatWallet />} */}
        </div>
    );
}

export default Portfolio;