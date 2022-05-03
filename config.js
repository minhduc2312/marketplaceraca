const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    'MONGODB_CONNECTION': process.env.MONGODB_CONNECTION_STRING
}