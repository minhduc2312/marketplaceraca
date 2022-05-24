import { toast } from "react-toastify";
import account from "../ConnectWeb3/account";
import web3Main, { web3Test } from "../ConnectWeb3/web3";
import { MAINNET } from "../constant/config";


export const signTransaction = async (txObj, network, account) => {
  try {
    const web3 = network === MAINNET ? web3Main : web3Test

    const signedTx = await web3.eth.accounts.signTransaction(txObj, account.privateKey);
    console.log("Signed Success!!!")
    if (signedTx) {
      const getReceipt = new Promise(async (resolve, reject) => {
        try {
          const transactionHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(res => {
            console.log(`Transaction: ${res.transactionHash}`)
            const interval = setInterval(function () {
              console.log("Attempting to get transaction receipt...");
            }, 1000);
            web3.eth.getTransactionReceipt(res.transactionHash, async function (err, res) {
              if (res) {
                clearInterval(interval);
                return resolve(res)
              }
              if (err) {
                clearInterval(interval);

                reject(err)
              }
            });
          }).catch(res => reject(res));
        } catch (err) {
        }
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
              return `'Transaction Rejected 🤯\n ${res.data}' `
            }
          },

        }
      )

      return getReceipt;
    }

  } catch (err) {
    toast.error(err.message)
    console.log(err)
  }

}