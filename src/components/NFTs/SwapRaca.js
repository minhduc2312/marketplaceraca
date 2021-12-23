import { useEffect, useState } from "react"


const SwapRacaToUSD = ({ priceRaca }) => {
    const [inputRaca, setInputRaca] = useState('');
    const [usdPrice, setUsdPrice] = useState(0);

    const handleChange = async (e) => {
        setInputRaca(e.target.value);
    }
    useEffect(() => {
        setUsdPrice(() => inputRaca * priceRaca);
    }, [inputRaca, priceRaca])
    return (
        <div id='swap-raca'>
            <input id="RACA" type="number" value={inputRaca} onChange={handleChange} />
            <span> ~ </span>
            <span id="USD">{usdPrice} USD</span>
        </div>
    )
}
export default SwapRacaToUSD;