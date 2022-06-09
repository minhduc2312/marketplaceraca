import { getAllowance } from "../../../web3js/action/getAllowance";
import { signTransaction } from "../../../web3js/action/SignTransaction";
import web3 from "../../../web3js/ConnectWeb3/web3";
import { MAINNET } from "../../../web3js/constant/config";
import { marketABI } from "./MarketABI";

import abi from 'human-standard-token-abi';
import { toast } from "react-toastify";
import { getApprove } from "../../../web3js/action/getApprove";

const addressMarket = "0xe97fdca0a3fc76b3046ae496c1502c9d8dfef6fc";
const addressRACA = '0x12BB890508c125661E03b09EC06E404bc9289040'

export const buyNFT = async (id_in_contract, price) => {
    try {
        const account = JSON.parse(sessionStorage.getItem('account'));
        if (account) {
            const contractMarket = new web3.eth.Contract(marketABI, addressMarket, account);
            const contractToken = new web3.eth.Contract(abi, addressRACA, account)
            const allowance = await getAllowance(addressRACA, account?.address, addressMarket, MAINNET);
            const balanceOfToken = await contractToken.methods.balanceOf(account?.address).call();
            if (price > Number(web3.utils.fromWei(balanceOfToken, 'ether'))) {
                console.log(price, web3.utils.fromWei(balanceOfToken, 'ether'))
                throw "Balance insufficient"
            }
            const priceToHex = web3.utils.numberToHex(web3.utils.toWei(price.toString()))
            const data = await contractMarket.methods.executeAuction(id_in_contract, priceToHex).encodeABI();
            let txObj = {
                "gasLimit": web3.utils.toHex(210000),
                "gasPrice": web3.utils.toWei('5'.toString(), 'gwei'),
                "value": '0x00',
                "from": account?.address,
                "data": data,
                "to": addressMarket,
                // "nonce": web3.utils.toHex(nonce)
            }
            return new Promise((resolve, reject) => {
                if (allowance < web3.utils.fromWei(price.toString(), 'ether')) {
                    getApprove(addressRACA, account?.address, addressMarket, 0, 5, MAINNET,account)
                }
                resolve()
            }).then(() => signTransaction(txObj, MAINNET, account));
        } else {
            throw `Input Private Key`
        }

    } catch (err) {
        toast.error(err)
        console.log(err?.message)
    }

}

