import web3 from "../../../web3js/ConnectWeb3/web3";
import { EventABI } from "../Action/EventABI";
import { marketABI } from "../Action/MarketABI";
import abi from 'human-standard-token-abi';
import { Box, Button, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import DetailsAuction from "./DetailsAuction";
import InputNFTBot from "./InputNFTBot";

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


const TrackingEvent = () => {
    const [logList, setLogList] = useState([]);
    const [event, setEvent] = useState();
    const [isStart, setIsStart] = useState(false);

    const ExecuteEvent = useCallback(async () => {
        try {
            const listAuction = [];
            const contractEvent = new web3.eth.Contract(EventABI, addressMarket, { from: '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16' })
            const event = contractEvent.events.allEvents({})
                .on('data', async function (event) {
                    if (!event.event) {
                        try {
                            const contractMarket = new web3.eth.Contract(marketABI, addressMarket, { from: '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16' })
                            const auctionsID = web3.utils.hexToNumberString(event.raw.topics[2])
                            const auctions = await contractMarket.methods.auctions(auctionsID).call()
                            const { id,nftAddress, count, startingPrice, tokenId, startDate } = auctions
                            if (nftAddress !== '0x0000000000000000000000000000000000000000') {
                                const contract = new web3.eth.Contract(abi, nftAddress, { from: '0x769Ba0Cb0D89666F7506194D2cF416Ea0F812e16' })
                                const nameNFT = await contract.methods.name().call()

                                const log = {
                                    id,
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
            setEvent(event)
        } catch (err) {
            console.log(err)
        }
    }, [])
    useEffect(() => {
        try {
            ExecuteEvent();
        } catch (err) {
            console.log(err)
        }
        return () => {
            event?.unsubscribe(function (error, success) {
                if (success)
                    console.log('Successfully unsubscribed!');
            });
        }
    }, [])

    const handleBot = (e) => {
        setIsStart(prev => !prev);
    }
    return (
        <Box sx={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', color: '#333', minHeight: '200px', '& .Mui-disabled': { backgroundColor: '#d9e2ef' } }}>
            <Typography variant='h4'>Tracking Event</Typography>
            <Box>
                <InputNFTBot />
                <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }} mt={1}>
                    <Button className={isStart ? 'disabled' : ''} disabled={isStart ? true : false} onClick={handleBot} sx={{
                        padding: '5px 10px', backgroundColor: '#20c997', color: '#fff', '&:not(.Mui-disabled):hover': { backgroundColor: '#42ba96' }
                    }}>Start</Button>
                    <Button className={isStart ? '' : 'disabled'} disabled={isStart ? false : true} onClick={handleBot}
                        sx={
                            {
                                padding: '5px 10px', backgroundColor: '#df4759', color: '#fff', '&:not(.Mui-disabled):hover': { backgroundColor: '#e31c34' },
                            }
                        }
                    >Stop</Button>

                </Box>
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
