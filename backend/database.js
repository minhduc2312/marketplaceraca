const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODB_CONNECTION } = require('../config')
const client = new MongoClient(MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("Database Connected Successfully");
    client.close();
});