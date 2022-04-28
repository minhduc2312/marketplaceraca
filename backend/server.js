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

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
