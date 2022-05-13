import web3Main, { web3Test } from "../ConnectWeb3/web3";
import abi from 'human-standard-token-abi';
import { MAINNET, networkUsing } from "../constant/config";
import { signTransaction } from "./SignTransaction";
import account from "../ConnectWeb3/account";

export const getApprove = async (tokenAddress, currentAccount, amount, gas, network) => {

    const web3 = network === MAINNET ? web3Main : web3Test

    const nonce = async () => await web3.eth.getTransactionCount(currentAccount);

    const token = new web3.eth.Contract(abi, tokenAddress, { from: currentAccount })
    const getTokenInWallet = await token.methods.balanceOf(currentAccount).call();
    const dataApproveToken = await token.methods.approve(networkUsing[network].PancakeRouter, web3.utils.toWei((getTokenInWallet).toString(), 'ether')).encodeABI();
    const txObj = {
        "gasLimit": web3.utils.toHex(290000),
        "gasPrice": web3.utils.toWei(gas.toString(), 'gwei'),
        "value": '0x00',
        "from": currentAccount,
        "data": dataApproveToken,
        "to": tokenAddress,
        "nonce": web3.utils.toHex(nonce)
    }
    signTransaction(txObj,account.privateKey)
}