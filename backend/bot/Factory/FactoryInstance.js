const ethers = require('ethers');
const { factoryABI } = require('./FactoryABI');
const { account } = require('../account')

const contractFactory = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

const factory = new ethers.Contract(contractFactory, factoryABI, account)
exports.factory = factory;