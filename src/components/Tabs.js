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
            <Box id="tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} sx={{ color: '#ffffff' }} onChange={handleChange}>
                    <Tab label="Raca" {...a11yProps(0)} />
                    <Tab label="Metamon" {...a11yProps(1)} />
                    <Tab label="Elemon" {...a11yProps(2)} />
                    <Tab label="Sales" {...a11yProps(3)} />
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