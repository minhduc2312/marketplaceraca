const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Holding", holdingSchema, "holding")