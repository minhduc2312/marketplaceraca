import { toast } from "react-toastify";
import account from "../ConnectWeb3/account";
import ContractPancakeSwap from "../ConnectWeb3/contractPancake";
import web3MainNet, { web3Test } from "../ConnectWeb3/web3";
import { networkUsing, MAINNET } from "../../web3/constant/config";
import { getAllowance } from "./getAllowance";
import { getApprove } from "./getApprove";
import { signTransaction } from "./SignTransaction";

export const sellToken = async (tokenAddress, amountToken, slippage, gasFee, network) => {
    try {
        console.log("Start...")
        const contract = ContractPancakeSwap(network)
        const currentAccount = account.address;
        const web3 = network === MAINNET ? web3MainNet : web3Test;
        const spend = web3.utils.toChecksumAddress(networkUsing[network].WrappedBNB);

        const tokenToSell = web3.utils.toChecksumAddress(tokenAddress)
        const allowance = await getAllowance(tokenToSell, currentAccount,network)
        const amountIn = web3.utils.toWei(amountToken.toString(), 'ether');

        if (amountToken > Number(web3.utils.fromWei(allowance, 'ether'))) {
            const approve = await getApprove(tokenAddress, currentAccount, amountToken,network);
        }

        const amounts = await contract.methods.getAmountsOut(amountIn, [tokenToSell, spend]).call();
        const amountsOutMin = amounts[1] * (100 - slippage) / 100
        const pancakeswap2_tx = await contract.methods.swapExactTokensForETH(amountIn, Math.floor(amountsOutMin).toString(), [tokenAddress, spend], currentAccount, Math.floor(Date.now() / 1000) + 60 * 20).encodeABI();

        const txObj = {
            "gasLimit": web3.utils.toHex(210000),
            "gasPrice": web3.utils.toWei(gasFee.toString(), 'gwei'),
            "value": '0x00',
            "from": currentAccount,
            "data": pancakeswap2_tx,
            "to": networkUsing[network].PancakeRouter,
        }
        console.log('Swapping...')
        signTransaction(txObj, network)
    } catch (err) {
        toast.error(err.message)
    }

}