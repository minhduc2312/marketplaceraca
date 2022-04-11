import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { updatePriceAuto } from './app/actions';
import HeaderTabs from './components/Tabs';
import axios from "axios"
import { AppProvider } from './context/AppContext';

function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    const getPrice = async () => {
      const { elmon, raca, btc } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=radio-caca,elemon,bitcoin&vs_currencies=usd').then(res => {
        return {
          raca: res.data['radio-caca'].usd,
          elmon: res.data['elemon'].usd,
          btc: res.data['bitcoin'].usd,
        }
      });
      const elcoin = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x092ffbc968203b652b08361adec75e275573f2db').then(res => Number(res.data.data.price).toFixed(8));
      document.title = raca + " - Marketplace RACA"
      dispatch(updatePriceAuto({ raca, elmon, elcoin, btc }))
    }
    getPrice()
    const updatePrice = setInterval(async () => {
      getPrice()
    }, 20000)

    return () => {
      clearInterval(updatePrice)
    }
  }, [])
  return (
    <div className="App">
      <AppProvider>
        <HeaderTabs />
      </AppProvider>
    </div>

  );
}

export default App;
