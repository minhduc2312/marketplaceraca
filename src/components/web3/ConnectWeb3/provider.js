import Web3 from "web3"

const ws = 'wss://speedy-nodes-nyc.moralis.io/bf16b431757b142d71246305/bsc/mainnet/ws'

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
