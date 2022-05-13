
import { ethers } from 'ethers';

const ws = 'wss://bsc-ws-node.nariox.org:443'
const mnemonic = "primary very hire bachelor wrestle column valve vast popular desk hockey unique"
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const provider = new ethers.providers.WebSocketProvider(ws);
const account = wallet.connect(provider);

export default account;
