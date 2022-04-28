const express = require('express');
const bodyParser = require('body-parser');
const raca = require('./routes/raca');
const cors = require('cors');
const database = require('./database')


const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}
const app = express();
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(bodyParser.json());
app.use(express.json())
app.options(cors(options))

app.use('/api/raca', raca);
const { MongoClient, ServerApiVersion } = require('mongodb');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
