const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("Database Connected Successfully");
    client.close();
});