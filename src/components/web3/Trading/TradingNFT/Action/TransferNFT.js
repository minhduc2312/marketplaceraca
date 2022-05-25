import web3 from '../../../web3js/ConnectWeb3/web3';

const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }

        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const transferNFT = async () => {
    const account = web3.eth.accounts.privateKeyToAccount('');
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account?.address;
    const contractAddress = "0xE8d66Ac34C5f8CFaC1aB4f6C949c6A612a2c45FF";
    const contract = new web3.eth.Contract(abi, contractAddress, { from: '0x6872e4b65Cba7a968454721939c921812DBbe8ab', gasLimit: '112320', gasPrice: web3.utils.toWei('5', 'Gwei') })
    const sendNFT = await contract.methods.safeTransferFrom('0x6872e4b65Cba7a968454721939c921812DBbe8ab', '0x2352934326Bc4C6e65d84AD5825D56137F8F2D5c', '30899').send()
    console.log(sendNFT);

    const txSendBNB = {
        from: '0x2352934326Bc4C6e65d84AD5825D56137F8F2D5c',
        to: '0x6872e4b65Cba7a968454721939c921812DBbe8ab',
        value: web3.utils.toWei('0.0005', 'ether'),
        gasLimit: web3.utils.toHex('21000'),
        gasPrice: web3.utils.toWei('5', 'Gwei'),
    }

    // const getTransaction = await web3.eth.accounts.signTransaction(txSendBNB, '');
    // const getReceipt = await web3.eth.sendSignedTransaction(getTransaction.rawTransaction);
    // console.log(getReceipt);
    const txSendNFT = {
        from: '0x10201091597635ec7b8e208306e6adcc7c167925',
        to: '0xE8d66Ac34C5f8CFaC1aB4f6C949c6A612a2c45FF',
        value: '0x00',
        data: '0x42842e0e00000000000000000000000010201091597635ec7b8e208306e6adcc7c1679250000000000000000000000002352934326bc4c6e65d84ad5825d56137f8f2d5c0000000000000000000000000000000000000000000000000000000000007940',
        gasLimit: web3.utils.toHex('97038'),
        gasPrice: web3.utils.toWei('5', 'Gwei'),
    }
    // const getTransactionNFT = await web3.eth.accounts.signTransaction(txSendNFT, '');
    // const getReceiptNFT = await web3.eth.sendSignedTransaction(getTransactionNFT.rawTransaction);
    // console.log(getReceiptNFT);

    // new Promise((resolve, reject) => {
    //     const interval = setInterval(function () {
    //         console.log("Attempting to get transaction receipt...");
    //         web3.eth.getTransactionReceipt(getReceipt, async function (err, res) {
    //             if (res) {
    //                 clearInterval(interval);
    //                 const txSendNFT = {
    //                     from: '0x6872e4b65Cba7a968454721939c921812DBbe8ab',
    //                     to: '0xF24Bf668Aa087990f1d40aBAbF841456E771913c',
    //                     value: '0x00',
    //                     data: '0x42842e0e0000000000000000000000006872e4b65cba7a968454721939c921812dbbe8ab0000000000000000000000002352934326bc4c6e65d84ad5825d56137f8f2d5c0000000000000000000000000000000000000000000000000000000000075fae',
    //                     gasLimit: web3.utils.toHex('97038'),
    //                     gasPrice: web3.utils.toWei('5', 'Gwei'),
    //                 }
    //                 const getTransactionNFT = await web3.eth.accounts.signTransaction(txSendNFT, '0x80d25ae251ae049a89ac4ae13e81cd1f7749ae43ee630b25c7840977b6c7bd3f');
    //                 const getReceiptNFT = await web3.eth.sendSignedTransaction(getTransactionNFT.rawTransaction);
    //                 console.log(getReceiptNFT);
    //                 return resolve(res)
    //             }
    //             if (err) {
    //                 reject(err)
    //             }
    //         });
    //     }, 100);
    //})





}