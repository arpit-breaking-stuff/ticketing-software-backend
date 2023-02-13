const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');


const dotenv = require('dotenv')
dotenv.config()
const uri = `mongodb+srv://notionuser:${process.env.MONGODB_PASSWORD}@notionbackend.nckkayw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("I am collection", collection)
    client.close();
});


const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});