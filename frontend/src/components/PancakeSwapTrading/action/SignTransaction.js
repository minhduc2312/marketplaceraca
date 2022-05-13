import { toast } from "react-toastify";
import account from "../ConnectWeb3/account";
import web3Main, { web3Test } from "../ConnectWeb3/web3";
import { MAINNET } from "../constant/config";


export const signTransaction = (txObj, network) => {
  const web3 = network === MAINNET ? web3Main : web3Test
  web3.eth.accounts.signTransaction(txObj, account.privateKey, (err, signedTx) => {
    if (err) {
      return err
    } else {
      toast.success("Transaction Submitted!");
      return web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (err, hash) => {
        if (err) {
          toast.error(`${err.message} 🤯`);
        } else {
          console.log(`Transaction: ${hash}`)
          const getReceipt = new Promise((resolve, reject) => {
            const interval = setInterval(function () {
              console.log("Attempting to get transaction receipt...");
              web3.eth.getTransactionReceipt(hash, async function (err, res) {
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
                  // window.localStorage.setItem('private', privateKey)
                  return `Transaction Successful!!!`
                },
                onClick(data) {
                  const url = network === MAINNET ? `https://bscscan.com/tx/${hash}` : `https://testnet.bscscan.com/tx/${hash}`
                  window.open(url, '_blank');
                }
              },
              error: {
                render(data) {
                  console.log(data)
                  return `'Transaction Rejected 🤯\n ${data}' `
                }
              },

            }
          )

        }
      })
    }
  })
}