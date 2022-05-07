const { factory } = require('./Factory');
const prompt = require('prompt-sync')({ sigint: true});


const inputAddress = prompt('Input Address to buy:');


factory.on("PairCreated", (token0, token1, pair) => {
    console.log(`
    ===============================
    Token0: ${token0}
    Token1: ${token1}
    PairAddress: ${pair}
    `)
    
});