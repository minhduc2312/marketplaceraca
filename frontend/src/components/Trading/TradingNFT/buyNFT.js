import { getAllowance } from "../action/getAllowance";
import { signTransaction } from "../action/SignTransaction";
import account from "../ConnectWeb3/account";
import web3 from "../ConnectWeb3/web3";
import { MAINNET } from "../../web3/constant/config";
import { marketABI } from "./MarketABI";

const addressMarket = "0xe97fdca0a3fc76b3046ae496c1502c9d8dfef6fc";
const addressRACA = '0x12BB890508c125661E03b09EC06E404bc9289040'

export const buyNFT = async (nft_address, price) => {
    const contractMarket = new web3.eth.Contract(marketABI, addressMarket, account);
    const allowance = await getAllowance(addressRACA, account.address,addressMarket, MAINNET);
    console.log(nft_address,price)
    const priceToHex = web3.utils.numberToHex(web3.utils.toWei(price.toString()))
    const data = await contractMarket.methods.executeAuction(nft_address, priceToHex).encodeABI();
    console.log(priceToHex)
    let txObj = {
        "gasLimit": web3.utils.toHex(290000),
        "gasPrice": web3.utils.toWei('10'.toString(), 'gwei'),
        "value": '0x00',
        "from": account.address,
        "data": data,
        "to": addressMarket,
        // "nonce": web3.utils.toHex(nonce)
    }

    signTransaction(txObj,MAINNET);
}

