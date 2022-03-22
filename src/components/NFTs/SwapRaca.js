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
        <div id='swap-raca'>
            <input id="RACA" type="number" value={inputRaca} onChange={handleChange} />
            <span> ~ </span>
            <span id="USD">{usdPrice} USD</span>
        </div>
    )
}
export default SwapRacaToUSD;