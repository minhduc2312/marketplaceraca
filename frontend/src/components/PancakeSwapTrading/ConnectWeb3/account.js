
import { ethers } from 'ethers';

const ws = 'wss://bsc-ws-node.nariox.org:443'
const mnemonic = "okay original strike skull install service poet rug candy dry forest blade"
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const provider = new ethers.providers.WebSocketProvider(ws);
const account = wallet.connect(provider);

export default account;
