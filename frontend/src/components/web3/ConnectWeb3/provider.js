import Web3 from "web3"

const ws = 'wss://bsc-ws-node.nariox.org:443'

const options = {
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
  };
const webSocketProvider = new Web3.providers.WebsocketProvider(ws,options);


export default webSocketProvider;
