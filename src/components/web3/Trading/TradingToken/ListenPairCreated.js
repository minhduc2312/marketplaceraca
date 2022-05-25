import web3 from "../../web3js/ConnectWeb3/web3";
import { ABIPairAddress, factoryABI } from "../../web3js/constant/ABI";
import { WrappedBNBMainnet } from "../../web3js/constant/config";
import { ethers } from "ethers";

export const ListenPairCreated = () => {
    //listening paircreated event, if event fired, handle buy token that have Liquidity
    console.log("Start ....")

    const contractFactory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
    const factory = new web3.eth.Contract(factoryABI, contractFactory)
    factory.events.allEvents({}, async (err,event) => {
        console.log(event)
        // const contractPair = new web3.eth.Contract(
        //     ABIPairAddress,
        //     pair,
        //     account
        // );
        // let addressToBuy;
        // if (token1 === WrappedBNBMainnet) {
        //     addressToBuy = token2
        // } else {
        //     addressToBuy = token1
        // }
        // try {
        //     const reserves = await contractPair.methods.getReserves().call()
        //     console.log(reserves)
        //     if (reserves[0] != 0 || reserves[1] != 0) {
        //         console.log(`Reserve:\nToken0: ${web3.utils.fromWei(reserves[0], 'ether')}\nToken1: ${web3.utils.fromWei(reserves[1], 'ether')}
        //   `)
        //         // buyToken(addressToBuy, '0.0001')
        //     }
        //     else {
        //         console.log(`No Reserves`)
        //     }
        // } catch (err) {
        //     console.log(err.message)
        // }

    });
}
