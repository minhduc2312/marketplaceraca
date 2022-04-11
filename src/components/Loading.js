import { CircularProgress, Box } from '@mui/material'
import React from 'react'

const Loading = (props) => {
    return (
        <Box sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
            <CircularProgress color="primary" />

        </Box>
    )
}

export default Loading