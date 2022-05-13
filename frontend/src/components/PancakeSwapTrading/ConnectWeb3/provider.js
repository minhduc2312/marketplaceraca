import Web3 from "web3"

const ws = 'wss://bsc-ws-node.nariox.org:443'
const webSocketProvider = new Web3.providers.WebsocketProvider(ws);


export default webSocketProvider;
