import { toast } from "react-toastify";
import ContractPancakeSwap from "../ConnectWeb3/contractPancake";
import web3MainNet, { web3Test } from "../ConnectWeb3/web3";
import { networkUsing, MAINNET } from "../../web3js/constant/config";
import { getAllowance } from "./getAllowance";
import { getApprove } from "./getApprove";
import { signTransaction } from "./SignTransaction";

export const sellToken = async (tokenAddress, amountToken, slippage, gasFee, network, account) => {
    try {
        console.log("Start...")
        const web3 = network === MAINNET ? web3MainNet : web3Test;

        const contract = ContractPancakeSwap(network)
        const currentAccount = account?.address;
        const spend = web3.utils.toChecksumAddress(networkUsing[network].WrappedBNB);

        const tokenToSell = web3.utils.toChecksumAddress(tokenAddress)
        const allowance = await getAllowance(tokenToSell, currentAccount, networkUsing[network].PancakeRouter, network)
        const amountIn = web3.utils.toWei(amountToken.toString(), 'ether');

        let approve;
        approve = getApprove(tokenAddress, account, networkUsing[network].PancakeRouter, amountToken, 10, network);
        if (amountToken > Number(web3.utils.fromWei(allowance, 'ether'))) {
        }

        const amounts = await contract.methods.getAmountsOut(amountIn, [tokenToSell, spend]).call();
        const amountsOutMin = amounts[1] * (100 - slippage) / 100;
        const swapMethod = contract.methods.swapExactTokensForETH(amountIn, Math.floor(amountsOutMin).toString(), [tokenAddress, spend], currentAccount, Math.floor(Date.now() / 1000) + 60 * 20)
        const estimateGas = await swapMethod.estimateGas();
        const pancakeswap2_tx = await swapMethod.encodeABI();

        const txObj = {
            "gasLimit": web3.utils.toHex(estimateGas),
            "gasPrice": web3.utils.toWei(gasFee.toString(), 'gwei'),
            "value": '0x00',
            "from": currentAccount,
            "data": pancakeswap2_tx,
            "to": networkUsing[network].PancakeRouter,
        }
        if (!approve) {
            return signTransaction(txObj, network, account)
        } else {
            approve.then(res => {
                if (res) {
                    console.log("Approve Successfully")
                    return signTransaction(txObj, network, account)
                }
            })
        }



    } catch (err) {
        toast.error(err.message)
        console.log(err)
    }

}