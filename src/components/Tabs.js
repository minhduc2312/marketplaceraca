import { memo, useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import NFTs from './NFTs/NFTs';
import Metamon from './Metamon/Metamon'
import Elemon from './Elemon/Elemon'
import '../App.css'
import Portfolio from './Portfolio/Portfolio';
import { Button, Typography } from '@mui/material';
import ImageAnimation from './ImageAnimation';
import ReactAudioPlayer from 'react-audio-player';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TabInfo = (props) => {
    const { label, style, ...others } = props
    return (
        <Box className='tab-info'>
            <img {...others} className={`icon-${label.toLowerCase()}`} />
            <Typography style={style} sx={{ fontSize: '16px', fontWeight: '600' }}>{label}</Typography>
        </Box>
    )
}
const HeaderTabs = () => {
    const myStorage = window.localStorage;
    const getTab = myStorage.getItem('tab') === undefined ? 0 : myStorage.getItem('tab');
    const [value, setValue] = useState(Number(getTab));
    const [isMute, setIsMute] = useState(true);
    const [statusMute, setStatusMute] = useState(true)
    const audioRef = useRef();
    const handleChange = (event, newValue) => {
        setValue(newValue);
        myStorage.setItem('tab', newValue);
    };
    const handleChangeSound = () => {
        const audioEl = audioRef?.current?.audioEl.current;
        // audioEl.paused = !isMute
        console.log(audioEl.paused)
        if (audioEl.paused) {
            audioEl.play()
        } else {
            audioEl.pause()
        }
        setIsMute(prev => !prev)
    }
    const onClickChangeSound = () => {
        handleChangeSound();
        setStatusMute(prev => !prev);
    }
    useEffect(() => {
        const audioEl = audioRef?.current?.audioEl.current;
        // console.log(audioEl.paused)
        const handlePressSpace = (event) => {
            if (event.keyCode === 32 && document.body) {
                onClickChangeSound()
                event.preventDefault();
            }
        }
        window.addEventListener('keydown', handlePressSpace)
        return () => {
            window.removeEventListener('keydown', handlePressSpace)
        }
    }, [])
    useEffect(() => {
        if (!statusMute) {
            window.addEventListener('blur', handleChangeSound)
            window.addEventListener('focus', handleChangeSound)
        }
        return () => {
            window.removeEventListener('blur', handleChangeSound)
            window.removeEventListener('focus', handleChangeSound)
        }

    }, [statusMute])
    return (
        <Box sx={{ width: '100%' }}>
            <ImageAnimation />
            <Button className='icon-muted' onClick={onClickChangeSound}><img width={35} src={`/marketplaceraca/${isMute ? 'mute.png' : 'sound.png'}`} /></Button>
            <ReactAudioPlayer
                src="/marketplaceraca/metamon-sound.mp3"
                
                controls
                loop
                ref={audioRef}
                style={{ display: 'none' }}
            />
            <Box id="tabs" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tabs id="tabs-bar" value={value} sx={{ color: '#ffffff', width: '600px' }} onChange={handleChange} centered>
                    <Tab className="tab" label={<TabInfo label='RACA' alt='raca' width='20px' src='/marketplaceraca/favicon.svg' />} {...a11yProps(0)} />
                    <Tab className="tab" label={<TabInfo label='METAMON' alt='metamon' width='40px' src='/marketplaceraca/raca/metamon-SR.png' />} {...a11yProps(1)} />
                    <Tab className="tab" label={<TabInfo label='ElEMON' alt='elemon' width='30px' src='/marketplaceraca/elemon-logo.png' />} {...a11yProps(2)} />
                    <Tab className="tab" label={<TabInfo label='STATISTICS' alt='sales' width='30px' src='/marketplaceraca/metamask.png' />} {...a11yProps(3)} />
                </Tabs>
            </Box>
            {
                value === 0 &&
                (<TabPanel className='tab-panel' value={value} index={0}>
                    <NFTs />
                </TabPanel>)
            }
            {
                value === 1 &&
                (<TabPanel className='tab-panel' value={value} index={1}>
                    <Metamon />
                </TabPanel>)
            }
            {
                value === 2 &&
                (<TabPanel className='tab-panel' value={value} index={2}>
                    <Elemon />
                </TabPanel>)
            }
            {
                value === 3 &&
                (<TabPanel className='tab-panel' value={value} index={3}>
                    <Portfolio />
                </TabPanel>)
            }
        </Box>
    );
}

export default memo(HeaderTabs);