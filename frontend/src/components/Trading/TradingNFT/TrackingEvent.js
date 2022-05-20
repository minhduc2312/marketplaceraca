import account from "../../web3/ConnectWeb3/account";
import web3 from "../../web3/ConnectWeb3/web3";
import { EventABI } from "./EventABI";

const addressMarket = "0xe97fdca0a3fc76b3046ae496c1502c9d8dfef6fc";
const addressRACA = '0x12BB890508c125661E03b09EC06E404bc9289040'

export const TrackingEvent = async () => {
    const data = "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c500000000000000000000000012bb890508c125661e03b09ec06e404bc9289040000000000000000000000000000000000000000000000e01592149dba128000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062863668000000000000000000000000000000000000000000000000ffffffffffffffff0000000000000000000000000000000000000000000000000000000006126db9"
    const decodeData = web3.eth.abi.decodeParameters([
        { internalType: 'address', name: 'nftAddress', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'count', type: 'uint256' },
        { internalType: 'address', name: 'paymentToken', type: 'address' },
        { internalType: 'uint256', name: 'startingPrice', type: 'uint256' },
        { internalType: 'uint64', name: 'startDate', type: 'uint64' },
        { internalType: 'uint64', name: 'endDate', type: 'uint64' },
    ], data)
    console.log(decodeData)
    try {
        const contractMarket = new web3.eth.Contract(EventABI, addressMarket, account)

        const event = contractMarket.events.allEvents({})
            .on('data', function (event) {
                console.log(event); // same results as the optional callback above
            })
            .on('changed', function (event) {
                // remove event from local database
                console.log(event)
            })
            .on('error', function (err) {
                console.log(`err:${err}`)
            });
        console.log(contractMarket)
    } catch (err) {
        console.log(err)
    }

}