import { MAINNET, networkUsing } from "../constant/config";
import abi from 'human-standard-token-abi';
import web3, { web3Test } from "../ConnectWeb3/web3";


export const getAllowance = async (tokenAddress, currentAccount, network) => {
    const web3js = network === MAINNET ? web3 : web3Test
    const token = new web3js.eth.Contract(abi, tokenAddress, { from: currentAccount })
    const approvalLimit = await token.methods.allowance(currentAccount, networkUsing[network].PancakeRouter).call();
    return approvalLimit;
}