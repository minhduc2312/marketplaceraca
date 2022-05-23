import { MAINNET, networkUsing } from "../../web3/constant/config";
import account from "./account";
import web3Main, { web3Test } from "./web3";


const ContractPancakeSwap = (network) => {
    const web3 = network === MAINNET ? web3Main : web3Test
    return new web3.eth.Contract(networkUsing[network].ABIPancakeSwap, networkUsing[network].PancakeRouter);
}

export default ContractPancakeSwap;


