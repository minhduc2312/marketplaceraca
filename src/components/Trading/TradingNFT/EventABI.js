export const EventABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": 'address', "name": 'seller', "type": 'address' },
            { "indexed": true, "internalType": 'uint256', "name": 'auctionId', "type": 'uint256' },
            { "indexed": true, "internalType": 'address', "name": 'nftAddress', "type": 'address' },
            { "indexed": false, "internalType": 'uint256', "name": 'tokenId', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint256', "name": 'count', "type": 'uint256' },
            { "indexed": false, "internalType": 'address', "name": 'paymentToken', "type": 'address' },
            { "indexed": false, "internalType": 'uint256', "name": 'startingPrice', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint256', "name": 'endingPrice', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint64', "name": 'startDate', "type": 'uint64' },
            { "indexed": false, "internalType": 'uint64', "name": 'endDate', "type": 'uint64' },
        ],
        "name": "AuctionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": 'address', "name": 'seller', "type": 'address' },
            { "indexed": true, "internalType": 'uint256', "name": 'auctionId', "type": 'uint256' },
            { "indexed": true, "internalType": 'address', "name": 'nftAddress', "type": 'address' },
            { "indexed": false, "internalType": 'uint256', "name": 'tokenId', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint256', "name": 'count', "type": 'uint256' },
            { "indexed": false, "internalType": 'address', "name": 'paymentToken', "type": 'address' },
            { "indexed": false, "internalType": 'uint256', "name": 'startingPrice', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint256', "name": 'endingPrice', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint64', "name": 'startDate', "type": 'uint64' },
            { "indexed": false, "internalType": 'uint64', "name": 'endDate', "type": 'uint64' },
        ],
        "name": "Sell",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": 'address', "name": 'bidder', "type": 'address' },
            { "indexed": true, "internalType": 'uint256', "name": 'auctionId', "type": 'uint256' },
            { "indexed": true, "internalType": 'address', "name": 'nftAddress', "type": 'address' },
            { "indexed": false, "internalType": 'uint256', "name": 'tokenId', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint256', "name": 'bid', "type": 'uint256' },
            { "indexed": false, "internalType": 'uint64', "name": 'endDate', "type": 'uint64' },
        ],
        "name": "AuctionExecuted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": 'address', "name": 'previousOwner', "type": 'address' },
            { "indexed": true, "internalType": 'address', "name": 'newOwner', "type": 'address' },

        ],
        "name": "OwnershipTransferred",
        "type": "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'seller', type: 'address' },
            { indexed: true, internalType: 'uint256', name: 'auctionId', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'nftAddress', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        "name": "AuctionCancelled",
        "type": "event"
    }

]

