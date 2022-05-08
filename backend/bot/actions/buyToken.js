
const { ethers, BigNumber } = require("ethers")
const { account } = require("../account")
const { PancakeRouter, WrappedBNBMainnet } = require("../constant")
const { web3 } = require("../web3")
const { PancakeSwapABI } = require("../web3/PancakeSwapABI")
const buyToken = async (tokenIn, amount) => {
    console.log(`Start buying token:${tokenIn} with amount ${5}`)
    try {
        const router = new ethers.Contract(
            PancakeRouter,
            PancakeSwapABI,
            account
        )
        const tokenBuy = ethers.utils.getAddress(tokenIn.toLowerCase())
        const amountIn = ethers.utils.parseUnits(amount.toString(), 'ether')
        const amounts = await router.getAmountsOut(amountIn, [WrappedBNBMainnet, tokenBuy])
        const amountOutMin = amounts[1].sub(amounts[1].div(10));
        //approval
        // let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
        // let provider = ethers.getDefaultProvider('ropsten')
        // let contract = new ethers.Contract(tokenIn, abi, account)
        // await contract.approve(PancakeRouter, amountIn)

        const tx = await router.swapExactETHForTokens(
            amountOutMin,
            [WrappedBNBMainnet, tokenBuy],
            account.address,
            Date.now() + 1000 * 60 * 10,
            {
                "gasLimit": web3.utils.toHex(310000),
                "gasPrice": web3.utils.toWei('5', 'gwei'),
                "value": amountIn
            }
        );
        // console.log(tx)
        const receipt = await tx.wait();
        console.log(`Transaction receipt: ${receipt}`);
    } catch (err) {
        console.log(err.message)
    }

}
buyToken('0x12BB890508c125661E03b09EC06E404BC9289040', '0.001')

exports.buyToken = buyToken;