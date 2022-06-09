import web3 from "../../../web3js/ConnectWeb3/web3";
import { EventABI } from "../Action/EventABI";
import { marketABI } from "../Action/MarketABI";
import abi from 'human-standard-token-abi';
import { Box, Button, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import DetailsAuction from "./DetailsAuction";
import InputNFTBot from "./InputNFTBot";
import { useDispatch, useSelector } from "react-redux";

const addressMarket = "0xe97fdca0a3fc76b3046ae496c1502c9d8dfef6fc";



const TrackingEvent = () => {
    const [logList, setLogList] = useState([]);
    const dispatch = useDispatch();
    const getStartBot = useSelector(state => state.startBot)
    const ExecuteEvent = useCallback(() => {
        let event;
        try {
            const listAuction = [];
            const contractEvent = new web3.eth.Contract(EventABI, addressMarket, { from: '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16' })
            event = contractEvent.events.allEvents({})
            event.on('data', async function (event) {
                if (!event.event) {
                    try {
                        const contractMarket = new web3.eth.Contract(marketABI, addressMarket, { from: '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16' })
                        const auctionsID = web3.utils.hexToNumberString(event.raw.topics[2])
                        const auctions = await contractMarket.methods.auctions(auctionsID).call()
                        const { id, nftAddress, count, startingPrice, tokenId, startDate } = auctions
                        if (nftAddress !== '0x0000000000000000000000000000000000000000') {
                            const contract = new web3.eth.Contract(abi, nftAddress, { from: '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16' })
                            const nameNFT = await contract.methods.name().call()

                            const log = {
                                id,
                                nftAddress,
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
                            } else {
                                console.log(auctionsID)
                            }
                        }
                    } catch (err) {
                        console.log(err.message)
                    }

                }
            })
                .on('changed', function (event) {
                    console.log(event)
                })
                .on('error', function (err) {
                    console.log(`err:${err}`)
                });
            return event
        } catch (err) {
            console.log(err)
        }
    }, [getStartBot])
    useEffect(() => {
        const event = ExecuteEvent();
        return () => {
            event?.unsubscribe(function (error, success) {
                if (success)
                    console.log('Successfully unsubscribed!');
                if (error)
                    console.log(error)
            });
        }
    }, [ExecuteEvent])


    return (
        <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', color: '#333', minHeight: '200px', '& .Mui-disabled': { backgroundColor: '#d9e2ef' } }}>
            <Typography variant='h4'>Tracking Event</Typography>
            <Box>
                <InputNFTBot />

                {
                    logList.length !== 0 && (
                        <Box sx={{ maxHeight: '800px', overflowY: 'auto' }} mt={2}>
                            {logList.map((log) => (
                                <DetailsAuction key={log.auctionsID} log={log}>

                                </DetailsAuction>
                            ))}

                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}

export default memo(TrackingEvent)
