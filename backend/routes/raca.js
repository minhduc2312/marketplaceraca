const express = require('express');
const { getNFTsPrice, getNFTsStats } = require('../controllers/raca');
const router = express.Router();

router
    .route('/market/price')
    .get(getNFTsPrice)

router
    .route('/market/stats/:id')
    .get(getNFTsStats)
router
    .route('/market/stats/:id/:size')
    .get(getNFTsStats)


module.exports = router