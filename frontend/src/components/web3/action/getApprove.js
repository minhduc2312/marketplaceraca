import web3Main, { web3Test } from "../ConnectWeb3/web3";
import abi from 'human-standard-token-abi';
import { MAINNET, networkUsing } from "../constant/config";
import { signTransaction } from "./SignTransaction";
import account from "../ConnectWeb3/account";

export const getApprove = async (tokenAddress, spender,receiver, amount, gas, network) => {
    try {
        const web3 = network === MAINNET ? web3Main : web3Test
        const nonce = await web3.eth.getTransactionCount(spender);
        const token = new web3.eth.Contract(abi, tokenAddress, { from: spender })
        const getTokenInWallet = await token.methods.balanceOf(spender).call();
        const dataApproveToken = await token.methods.approve(receiver, getTokenInWallet).encodeABI();
        const txObj = {
            "gasLimit": web3.utils.toHex(290000),
            "gasPrice": web3.utils.toWei('10', 'gwei'),
            "value": '0x00',
            "from": spender,
            "data": dataApproveToken,
            "to": tokenAddress,
            // "nonce": web3.utils.toHex(nonce)
        }
        console.log(txObj, MAINNET, account.privateKey)
        
        signTransaction(txObj, MAINNET, account.privateKey)
    } catch (err) {
        console.log(err)
    }

}