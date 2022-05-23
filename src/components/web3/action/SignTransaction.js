import { toast } from "react-toastify";
import account from "../ConnectWeb3/account";
import web3Main, { web3Test } from "../ConnectWeb3/web3";
import { MAINNET } from "../constant/config";


export const signTransaction = async (txObj, network, account) => {
  try {
    const web3 = network === MAINNET ? web3Main : web3Test

    const signedTx = await web3.eth.accounts.signTransaction(txObj, account.privateKey);
    console.log("Signed Success!!!")

    const getReceipt = new Promise(async (resolve, reject) => {
      const transactionHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(res => res.transactionHash);
      console.log(`Transaction: ${transactionHash}`)
      const interval = setInterval(function () {
        console.log("Attempting to get transaction receipt...");
        web3.eth.getTransactionReceipt(transactionHash, async function (err, res) {
          if (res) {
            clearInterval(interval);
            return resolve(res)
          }
          if (err) {
            reject(err)
          }
        });
      }, 1000);

    })

    toast.promise(
      getReceipt,
      {
        pending: 'Transaction Pending',
        success: {
          render({ data }) {
            return `Transaction Successful!!!`
          },
          onClick(data) {
            const url = network === MAINNET ? `https://bscscan.com/tx/${signedTx.transactionHash}` : `https://testnet.bscscan.com/tx/${signedTx.transactionHash}`
            window.open(url, '_blank');
          }
        },
        error: {
          render(res) {
            console.log(res.data)
            return `'Transaction Rejected 🤯\n ${res.data}' `
          }
        },

      }
    )

    return getReceipt;


    // return web3.eth.accounts.signTransaction(txObj, account.privateKey, (err, signedTx) => {
    //   if (err) {
    //     toast.error(`${err.message} 🤯`);
    //   } else {
    //     toast.success("Transaction Submitted!");
    //     web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, hash) => {
    //       if (err) {
    //         toast.error(`${err.message} 🤯`);
    //       } else {
    //         console.log(`Transaction: ${hash}`)
    //         const getReceipt = new Promise((resolve, reject) => {
    //           const interval = setInterval(function () {
    //             console.log("Attempting to get transaction receipt...");
    //             web3.eth.getTransactionReceipt(hash, async function (err, res) {
    //               if (res) {
    //                 clearInterval(interval);
    //                 return resolve(res)
    //               }
    //               if (err) {
    //                 reject(err)
    //               }
    //             });
    //           }, 1000);
    //         })

    //         toast.promise(
    //           getReceipt,
    //           {
    //             pending: 'Transaction Pending',
    //             success: {
    //               render({ data }) {
    //                 // window.localStorage.setItem('private', privateKey)
    //                 return `Transaction Successful!!!`
    //               },
    //               onClick(data) {
    //                 const url = network === MAINNET ? `https://bscscan.com/tx/${hash}` : `https://testnet.bscscan.com/tx/${hash}`
    //                 window.open(url, '_blank');
    //               }
    //             },
    //             error: {
    //               render(data) {
    //                 console.log(data)
    //                 return `'Transaction Rejected 🤯\n ${data}' `
    //               }
    //             },

    //           }
    //         )
    //         return getReceipt;
    //       }
    //     })
    //   }
    // })
  } catch (err) {
    console.log(err)
    toast.error(err.message)
  }

}