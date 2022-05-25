export const marketABI = [
    {
        "constant": true,
        "name": "executeAuction",
        "inputs": [
            {
                "internalType": "uint256",
                "name": "auctionId",
                "type": "uint256",
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
            },
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [
            { "internalType": "address", "name": "seller", "type": "address" },
            { "internalType": "address", "name": "nftAddress", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "count", "type": "uint256" },
            { "internalType": "address", "name": "paymentToken", "type": "address" },
            { "internalType": "uint256", "name": "startingPrice", "type": "uint256" },
            { "internalType": "uint256", "name": "endingPrice", "type": "uint256" },
            { "internalType": "uint64", "name": "createDate", "type": "uint64" },
            { "internalType": "uint64", "name": "startDate", "type": "uint64" },
            { "internalType": "uint64", "name": "endDate", "type": "uint64" },
        ],
        "name": "hashAuction",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
        ],
        "name": "auctions",
        "outputs": [
            { "internalType": "address payable", "name": "seller", "type": "address" },
            { "internalType": "address", "name": "nftAddress", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "uint256", "name": "count", "type": "uint256" },
            { "internalType": "address", "name": "paymentToken", "type": "address" },
            { "internalType": "uint256", "name": "startingPrice", "type": "uint256" },
            { "internalType": "uint256", "name": "endingPrice", "type": "uint256" },
            { "internalType": "uint64", "name": "createDate", "type": "uint64" },
            { "internalType": "uint64", "name": "startDate", "type": "uint64" },
            {
                "components": [
                    { "internalType": "struct Timers.Timestamp", "name": "endDate", "type": "tuple" }
                ],
                "internalType": "struct Timers.Timestamp",
                "name": "endDate",
                "type": "tuple",
            },
            { "internalType": "uint256", "name": "protocolFee", "type": "uint256" },
            { "internalType": "address", "name": "bidder", "type": "address" },
            { "internalType": "enum Auction.AuctionStatus", "name": "status", "type": "uint8" },
        ],

        "stateMutability": "view",
        "type": "function",
    }

]