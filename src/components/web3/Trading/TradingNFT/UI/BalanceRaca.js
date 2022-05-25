
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBalanceRaca } from "../../../../../app/actions";
import { memo, useEffect } from "react";
import { getBalanceRaca } from "../Action/getBalanceRaca";


const BalanceRaca = () => {
    const balanceRaca = useSelector(prev => prev.balanceRaca)
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            const setBalance = async () => {
                const balance = await getBalanceRaca()
                dispatch(setBalanceRaca(balance))
            }
            setBalance();
        } catch (err) {
            console.log(err)
        }

    }, [])
    return (
        <>
            <Typography sx={{ color: '#333', }}>{`Balance RACA: ${balanceRaca}`}</Typography>
        </>

    )

}

export default memo(BalanceRaca)