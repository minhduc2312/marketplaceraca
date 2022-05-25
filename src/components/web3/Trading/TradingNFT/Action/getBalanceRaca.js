import web3 from "../../../web3js/ConnectWeb3/web3";
import abi from "human-standard-token-abi"
import { toast } from "react-toastify";

const addressRACA = '0x12BB890508c125661E03b09EC06E404bc9289040'


export const getBalanceRaca = async () => {
    try {
        const account = JSON.parse(sessionStorage.getItem('account'));
        if (account) {
            const contract = new web3.eth.Contract(abi, addressRACA, { from: account.address });
            const balance = await contract.methods.balanceOf(account?.address).call();
            return web3.utils.fromWei(balance, 'ether')
        } else {
            return 0
        }

    } catch (err) {
        toast.error(err.message)
        console.log(err.message)
    }

}