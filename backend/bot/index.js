const { account } = require('./account');
// const { buyToken } = require('./actions/buyToken');
const { PancakeRouter } = require('./constant');
// const { factory } = require('./Factory');
// const { web3 } = require('./web3');
const { PancakeSwapABI } = require('./web3/PancakeSwapABI');
const prompt = require('prompt-sync')();


// const inputAddress = prompt('Input Address to buy:');

// console.log(`Address ${inputAddress}`)
// const contract = new web3.eth.Contract(PancakeSwapABI, PancakeRouter, account);
// factory.on("PairCreated", async (token0, token1, pair) => {
//     const liqABI = [
//         {
//             "constant": true,
//             "inputs": [

//             ],
//             "name": "getReserves",
//             "outputs": [
//                 {
//                     "internalType": "uint112",
//                     "name": "_reserve0",
//                     "type": "uint112"
//                 },
//                 {
//                     "internalType": "uint112",
//                     "name": "_reserve1",
//                     "type": "uint112"
//                 },
//                 {
//                     "internalType": "uint32",
//                     "name": "_blockTimestampLast",
//                     "type": "uint32"
//                 }
//             ],
//             "payable": false,
//             "stateMutability": "view",
//             "type": "function"
//         },
//     ]

//     const contractPair = new web3.eth.Contract(
//         liqABI,
//         pair
//     )

//     console.log(`
//     ===============================
//     Token0: ${token0}
//     Token1: ${token1}
//     PairAddress: ${pair}
//     `)
//     try {
//         const reserves = await contractPair.methods.getReserves().call()
//         console.log(reserves)
//     } catch (error) {
//         console.log(error.message)
//     }

//     // if (reserves) {
//     //     console.log(`
//     //     Reserve:
//     //     Token0: ${web3.utils.toWei(reserves.result._reserve0, 'ether')}
//     //     Token1: ${web3.utils.toWei(reserves.result._reserve1, 'ether')}
//     // `)
//     // }
//     // else {
//     //     console.log(`No Reserves`)
//     // }

// });