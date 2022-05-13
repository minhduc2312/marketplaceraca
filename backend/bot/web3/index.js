const Web3 = require('web3')
const { account } = require("../account");
const { BSCMainNet, PancakeRouter } = require("../constant")
const { pancakeSwapABI } = require('./PancakeSwapABI')

const web3 = new Web3(new Web3.providers.HttpProvider(BSCMainNet));

exports.web3 = web3;
