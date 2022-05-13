import account from "../ConnectWeb3/account";

const addressMarket = "0xe97fdca0a3fc76b3046ae496c1502c9d8dfef6fc";
const marketABI = [
    {
        "constant": true,
        "name": "executeAuction",
        "inputs": [
            {
                "internalType": "uint256",
                "name": "auctionId",
                "type": "uint256",
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
            },
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
]
const contractMarket = new web3.eth.Contract(marketABI, addressMarket, account);
const data = await contractMarket.methods.executeAuction("26013609904897386866907538885584849244228742047584962791369064770412747228075", "0x0c16bf267ed01c0000").encodeABI();
let txObj = {
    "gasLimit": web3.utils.toHex(290000),
    "gasPrice": web3.utils.toWei('10'.toString(), 'gwei'),
    "value": '0x00',
    "from": account.address,
    "data": data,
    "to": addressMarket,
    // "nonce": web3.utils.toHex(nonce)
}
// signTransaction(txObj);
