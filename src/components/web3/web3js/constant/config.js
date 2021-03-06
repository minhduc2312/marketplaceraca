import { ABIPancakeSwap, ABIPancakeSwapTest } from "./ABI"
export const PancakeRouter = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
export const PancakeRouterTestnet = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
export const WrappedBNBMainnet = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
export const WrappedBNBTestnet = '0xae13d989dac2f0debff460ac112a837c89baa7cd'
export const addressBUSDTestnet = '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'
export const BSCMainNet = 'https://bsc-dataseed.binance.org'
export const BSCTestNet = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

export const TESTNET = 'testnet';
export const MAINNET = 'mainnet'
export const networkUsing = {
    testnet: {
        "PancakeRouter": PancakeRouterTestnet,
        "BSCChain": BSCTestNet,
        "WrappedBNB": WrappedBNBTestnet,
        "ABIPancakeSwap": ABIPancakeSwapTest
    },
    mainnet: {
        "PancakeRouter": PancakeRouter,
        "BSCChain": BSCMainNet,
        "WrappedBNB": WrappedBNBMainnet,
        "ABIPancakeSwap": ABIPancakeSwap
    }
}


