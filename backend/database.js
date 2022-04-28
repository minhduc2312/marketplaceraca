const { MongoClient, ServerApiVersion } = require('mongodb');

const connection = "mongodb+srv://minhduc231298:Crushonyou231298@portfolio-mind.pntix.mongodb.net/portfolio-mind?retryWrites=true&w=majority";
const client = new MongoClient(connection, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("Database Connected Successfully");
    client.close();
});