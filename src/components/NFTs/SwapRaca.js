import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";


const SwapRacaToUSD = () => {
    const [inputRaca, setInputRaca] = useState('');
    const [usdPrice, setUsdPrice] = useState(0);

    const handleChange = async (e) => {
        setInputRaca(e.target.value);
    }
    const { raca } = useSelector(state => state.price)
    useEffect(() => {
        setUsdPrice(() => inputRaca * raca);
    }, [inputRaca, raca])
    return (
        <Box id='swap-raca'>
            <TextField sx={{ height: '50px' }} id="RACA" type="number" variant="outlined" value={inputRaca} onChange={handleChange} />
            <span> ~ </span>
            <span id="USD">{usdPrice.toFixed(4)} USD</span>
        </Box>
    )
}
export default SwapRacaToUSD;