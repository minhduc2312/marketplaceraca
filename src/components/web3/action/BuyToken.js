import { toast } from "react-toastify";
import account from "../ConnectWeb3/account";
import ContractPancakeSwap from "../ConnectWeb3/contractPancake";
import web3MainNet, { web3Test } from "../ConnectWeb3/web3";
import { networkUsing, MAINNET } from "../constant/config";
import { signTransaction } from "./SignTransaction";

export const buyToken = async (tokenAddress, amountBNB, slippage, gasFee, network, key) => {
    try {
        const contract = ContractPancakeSwap(network)
        const web3 = network === MAINNET ? web3MainNet : web3Test;
        const spend = web3.utils.toChecksumAddress(networkUsing[network].WrappedBNB);
        const tokenToBuy = web3.utils.toChecksumAddress(tokenAddress)

        const privateKey = localStorage.getItem('private');
        const account = web3.eth.accounts.privateKeyToAccount(privateKey)
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
        console.log('Swap...')
        const amountsOutMin = tokenBuyValue * (100 - slippage) / 100
        const pancakeswap2_tx = await contract.methods.swapExactETHForTokens(Math.floor(amountsOutMin).toString(), [spend, tokenToBuy], account?.address, Math.floor(Date.now() / 1000) + 60 * 20).encodeABI();

        const lastBlock = await web3.eth.getBlock("latest");
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = Math.floor(lastBlock.gasLimit / lastBlock.transactions.length);
        const txObj = {
            "gasLimit": web3.utils.toHex(gasLimit),
            "gasPrice": web3.utils.toWei(gasFee.toString(), 'gwei'),
            "value": web3.utils.toHex(BNBvalue),
            "from": account?.address,
            "data": pancakeswap2_tx,
            "to": networkUsing[network].PancakeRouter,
        }
        return signTransaction(txObj, network, account).then(res => res).catch(err => console.log(err))
    } catch (err) {
        toast.error(err.message)
        console.log(err.message)
    }
}