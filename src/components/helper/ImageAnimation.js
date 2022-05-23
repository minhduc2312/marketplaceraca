import { Box } from '@mui/material';

const ImageAnimation = () => {

    return (
        <Box style={{height:'150px',position:'relative'}}>
            <img width={'150px'} src={`${process.env.PUBLIC_URL}/astronaut-1.png`} alt="" id='astronaut' />
        </Box>
    )
}

export default ImageAnimation