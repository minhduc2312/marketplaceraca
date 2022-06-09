import web3Main, { web3Test } from "../ConnectWeb3/web3";
import abi from 'human-standard-token-abi';
import { MAINNET, networkUsing } from "../constant/config";
import { signTransaction } from "./SignTransaction";

export const getApprove = async (tokenAddress, account, receiver, amount, gas, network) => {
    try {
        const spender = account.address
        const web3 = network === MAINNET ? web3Main : web3Test
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account?.address;
        const token = new web3.eth.Contract(abi, tokenAddress, { from: spender, gas: web3.utils.toHex('290000'), gasPrice: web3.utils.toWei(gas.toString(), 'gwei') })
        console.log(token)
        const getTokenInWallet = await token.methods.balanceOf(spender).call();
        const getAmountApprove = web3.utils.fromWei(getTokenInWallet, 'ether') * 10;
        const estimateGas = await approveMethod.estimateGas()
        const approveMethod = token.methods.approve(receiver, web3.utils.toWei(getAmountApprove.toString(), 'ether'))
        const dataApproveToken = await approveMethod.send();

        return dataApproveToken
    } catch (err) {
        console.log(err)
    }

}