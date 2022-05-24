import { Box, Grid } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify';

import Marketplace from './UI/Marketplace';
import { TrackingEvent } from './UI/TrackingEvent';




const TradingNFT = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid sx={{
                '& svg': {
                    color: "#333 !important"
                },
                display: 'flex',
                flexDirection: 'row'
            }} className="tradingNFT" container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                <ToastContainer position={toast.POSITION.TOP_CENTER} style={{ borderRadius: 10 }} />
                <Grid xs={12} lg={9}  item >
                    <Marketplace />
                </Grid>
                <Grid className='tracking__event' item xs={12} lg={3}>
                    <TrackingEvent />
                </Grid>

            </Grid>
        </Box>

    )
}

export default TradingNFT