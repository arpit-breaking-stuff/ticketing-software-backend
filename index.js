import { MongoClient, ServerApiVersion } from 'mongodb';
import { AppEnv } from './AppEnv.js'
import "./routes/index.js"

const uri = `mongodb+srv://${AppEnv.MONGODB_USERNAME}:${AppEnv.MONGODB_PASSWORD}@notionbackend.nckkayw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("I am collection", collection)
    client.close();
});
