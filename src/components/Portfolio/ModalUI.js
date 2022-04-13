import React, { useState, useEffect } from 'react'
import '../../styles/statwallet.css'
import axios from 'axios';
import { Box, Modal } from '@mui/material';

const ModalUI = ({ isOpen, setOpen, children, onClose }) => {
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    const style = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -22%)',
        bgcolor: 'background.paper',
        border: '2px solid #00000087',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style} id='modalUI'>
                {children}
            </Box>
        </Modal>
    )
}

export default ModalUI