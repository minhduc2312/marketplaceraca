import provider from './provider'
import { BSCTestNet } from '../../web3js/constant/config';
import Web3 from 'web3';

const web3 = new Web3(provider);

export const web3Test = new Web3(new Web3.providers.HttpProvider(BSCTestNet));
export default web3