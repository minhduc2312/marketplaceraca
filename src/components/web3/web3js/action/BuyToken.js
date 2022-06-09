import { toast } from "react-toastify";
import ContractPancakeSwap from "../ConnectWeb3/contractPancake";
import web3MainNet, { web3Test } from "../ConnectWeb3/web3";
import { networkUsing, MAINNET } from "../constant/config";
import { signTransaction } from "./SignTransaction";

export const buyToken = async (tokenAddress, amountBNB, slippage, gasFee, network, account) => {
    try {
        console.log('Swap...')
        const contract = ContractPancakeSwap(network)
        const web3 = network === MAINNET ? web3MainNet : web3Test;
        const spend = web3.utils.toChecksumAddress(networkUsing[network].WrappedBNB);
        const tokenToBuy = web3.utils.toChecksumAddress(tokenAddress)

        const amountIn = web3.utils.toWei(amountBNB.toString());

        let amounts;
        let BNBvalue, tokenBuyValue;
        if (amountBNB) {
            amounts = await contract.methods.getAmountsOut(amountIn, [spend, tokenToBuy]).call();
            BNBvalue = amounts[0];
            tokenBuyValue = amounts[1]
        } else {
            amounts = await contract.methods.getAmountsOut(amountIn, [tokenToBuy, spend]).call();
            BNBvalue = amounts[1];
            tokenBuyValue = amounts[0]
        }
        const amountsOutMin = tokenBuyValue * (100 - slippage) / 100

        const swapMethod = contract.methods.swapExactETHForTokens(Math.floor(amountsOutMin).toString(), [spend, tokenToBuy], account?.address, Math.floor(Date.now() / 1000) + 60 * 20)
        const pancakeSwap2_tx = await swapMethod.encodeABI();
        
        const txObj = {
            "gasLimit": web3.utils.toHex(290000),
            "gasPrice": web3.utils.toWei(gasFee.toString(), 'gwei'),
            "value": web3.utils.toHex(BNBvalue),
            "from": account?.address,
            "data": pancakeSwap2_tx,
            "to": networkUsing[network].PancakeRouter,
        }
        return signTransaction(txObj, network, account).then(res => res).catch(err => console.log(err))
    } catch (err) {
        toast.error(err.message)
        console.log(err.message)
    }
}