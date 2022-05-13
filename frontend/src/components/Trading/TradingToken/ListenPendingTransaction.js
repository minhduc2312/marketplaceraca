import web3 from "../ConnectWeb3/web3";


const subscription = web3.eth.subscribe('pendingTransactions', function (error, result) {
    if (!error)
        console.log(result);
})
export const getPendingTransaction = () => {
    subscription.on('data', (txHash) => {
        setTimeout(async () => {
            try {
                let tx = await web3.eth.getTransaction(txHash);
                if (tx) {
                    console.log('TX hash: ', txHash); // transaction hash
                    console.log('TX block hash: ', tx.blockHash); // hash of the block where this transaction was in. "null" when transaction is pending
                    console.log('TX sender address: ', tx.from); // address of the sender
                    console.log('TX amount(in BNB): ', web3.utils.fromWei(tx.value, 'ether')); // value transferred in ether
                    console.log('=====================================') // a visual separator
                }
            } catch (err) {
                console.error(err);
            }
        })
    });
}

export const unsubscribePendingTransaction = () => {

}
