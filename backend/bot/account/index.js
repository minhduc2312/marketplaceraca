const ethers = require('ethers')


const mnemonic = "okay original strike skull install service poet rug candy dry forest any"
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const ws = 'wss://bsc-ws-node.nariox.org:443'
const provider = new ethers.providers.WebSocketProvider(ws);
const account = wallet.connect(provider);
exports.account = account;