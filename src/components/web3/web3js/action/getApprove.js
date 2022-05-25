import web3Main, { web3Test } from "../ConnectWeb3/web3";
import abi from 'human-standard-token-abi';
import { MAINNET, networkUsing } from "../constant/config";
import { signTransaction } from "./SignTransaction";

export const getApprove = async (tokenAddress, spender, receiver, amount, gas, network) => {
    try {
        const account = sessionStorage.getItem('account');
        
        const privateKey = sessionStorage.getItem('account') || localStorage.getItem('private');
        if (typeof privateKey === 'string') {
            account = web3.eth.accounts.privateKeyToAccount(privateKey)
        }
        const web3 = network === MAINNET ? web3Main : web3Test
        const nonce = await web3.eth.getTransactionCount(spender);
        const token = new web3.eth.Contract(abi, tokenAddress, { from: spender })
        const getTokenInWallet = await token.methods.balanceOf(spender).call();
        const dataApproveToken = await token.methods.approve(receiver, getTokenInWallet*10).encodeABI();
        const txObj = {
            "gasLimit": web3.utils.toHex(210000),
            "gasPrice": web3.utils.toWei('10', 'gwei'),
            "value": '0x00',
            "from": spender,
            "data": dataApproveToken,
            "to": tokenAddress,
            // "nonce": web3.utils.toHex(nonce)
        }

        signTransaction(txObj, MAINNET, account)
    } catch (err) {
        console.log(err)
    }

}