import account from "../ConnectWeb3/account";
import web3 from "../ConnectWeb3/web3";
import { ABIPairAddress, factoryABI } from "../constant/ABI";
import { WrappedBNBMainnet } from "../constant/config";


//listening paircreated event, if event fired, handle buy token that have Liquidity
console.log("Start ....")

const contractFactory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"
const factory = new ethers.Contract(contractFactory, factoryABI, account)

factory.on("PairCreated", async (token1, token2, pair) => {
    console.log(token1, token2, pair)

    const contractPair = new web3.eth.Contract(
        ABIPairAddress,
        pair,
        account
    );
    let addressToBuy;
    if (token1 === WrappedBNBMainnet) {
        addressToBuy = token2
    } else {
        addressToBuy = token1
    }
    try {
        const reserves = await contractPair.methods.getReserves().call()
        console.log(reserves)
        if (reserves[0] != 0 || reserves[1] != 0) {
            console.log(`Reserve:\nToken0: ${web3.utils.fromWei(reserves[0], 'ether')}\nToken1: ${web3.utils.fromWei(reserves[1], 'ether')}
          `)
            // buyToken(addressToBuy, '0.0001')
        }
        else {
            console.log(`No Reserves`)
        }
    } catch (err) {
        console.log(err.message)
    }

});