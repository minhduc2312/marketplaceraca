import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import NFTs from './NFTs/NFTs';
import Metamon from './Metamon/Metamon'
import Elemon from './Elemon/Elemon'
import '../App.css'
import Portfolio from './Portfolio/Portfolio';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const HeaderTabs = (props) => {
    const myStorage = window.localStorage;
    const getTab = myStorage.getItem('tab') === undefined ? 0 : myStorage.getItem('tab');
    const [value, setValue] = useState(Number(getTab));
    const handleChange = (event, newValue) => {
        setValue(newValue);
        myStorage.setItem('tab', newValue);

    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box id="tabs" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tabs id="tabs-bar" value={value} sx={{ color: '#ffffff', width: '600px' }} onChange={handleChange} centered>
                    <Tab className="tab" label={<img alt='raca' width='30px' src='/marketplaceraca/favicon.svg'/>} {...a11yProps(0)} />
                    <Tab className="tab" label={<img alt='metamon' width='50px' src='/marketplaceraca/metamon-SR.png' />} {...a11yProps(1)} />
                    <Tab className="tab" label={<img alt='elemon' width='40px' src='/marketplaceraca/elemon-logo.png' />} {...a11yProps(2)} />
                    <Tab className="tab" label={<img alt='sales' width='40px' src='/marketplaceraca/metamask.png' />} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <NFTs />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Metamon />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Elemon />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Portfolio />
            </TabPanel>
        </Box>
    );
}

export default HeaderTabs;