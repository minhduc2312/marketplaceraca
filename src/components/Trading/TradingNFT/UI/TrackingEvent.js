import web3 from "../../../web3/ConnectWeb3/web3";
import { EventABI } from "../EventABI";
import { marketABI } from "../MarketABI";
import abi from 'human-standard-token-abi';
import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import DetailsAuction from "./DetailsAuction";

const addressMarket = "0xe97fdca0a3fc76b3046ae496c1502c9d8dfef6fc";

const getDataEvent = (data) => {
    if (data.length >= 458) {
        data = `0x${data.slice(10)}`
    }
    const decodeData = web3.eth.abi.decodeParameters([
        { internalType: 'address', name: 'nftAddress', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'count', type: 'uint256' },
        { internalType: 'address', name: 'paymentToken', type: 'address' },
        { internalType: 'uint256', name: 'startingPrice', type: 'uint256' },
        { internalType: 'uint64', name: 'startDate', type: 'uint64' },
        { internalType: 'uint64', name: 'endDate', type: 'uint64' },
    ], data)

    return decodeData;
}



export const TrackingEvent = () => {
    const [logList, setLogList] = useState([]);
    const listAuction = [];
    const ExecuteEvent = useCallback(async () => {
        try {
            const contractEvent = new web3.eth.Contract(EventABI, addressMarket)
            contractEvent.events.allEvents({})
                .on('data', async function (event) {
                    if (!event.event) {
                        const contractMarket = new web3.eth.Contract(marketABI, addressMarket)

                        const auctionsID = web3.utils.hexToNumberString(event.raw.topics[2])
                        const auctions = await contractMarket.methods.auctions(auctionsID).call()
                        const { nftAddress, count, startingPrice, tokenId, startDate } = auctions

                        const contract = new web3.eth.Contract(abi, nftAddress)
                        const nameNFT = await contract.methods.name().call()

                        const log = {
                            nameNFT,
                            tokenId,
                            count,
                            average: web3.utils.fromWei(startingPrice, 'ether') / count,
                            total: web3.utils.fromWei(startingPrice, 'ether'),
                            time: new Date(startDate * 1000).toLocaleTimeString(),
                            auctionsID,
                        }
                        if (!listAuction.includes(auctionsID)) {
                            setLogList(prev => [log, ...prev])
                        }else{
                            console.log(auctionsID)
                        }
                    }
                })
                .on('changed', function (event) {
                    // remove event from local database
                    console.log(event)
                })
                .on('error', function (err) {
                    console.log(`err:${err}`)
                });
        } catch (err) {
            console.log(err)
        }
    }, [])
    useEffect(() => {
        ExecuteEvent();
    }, [])
    return (
        <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', color: '#333', minHeight: '200px', maxHeight: '1200px' }}>
            <Typography variant='h4'>Tracking Event</Typography>
            {logList.length !== 0 && (
                <Box sx={{ maxHeight: '1150px', overflowY: 'auto' }}>
                    {logList.map((log) => (
                        <DetailsAuction key={log.auctionsID} log={log}>

                        </DetailsAuction>
                    ))}

                </Box>
            )}
        </Box>
    )
}