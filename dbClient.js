import { MongoClient, ServerApiVersion } from 'mongodb';
import { AppEnv } from './AppEnv.js'

async function db() {
    const uri = `mongodb+srv://${AppEnv.MONGODB_USERNAME}:${AppEnv.MONGODB_PASSWORD}@notionbackend.nckkayw.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client;
}

const dbClient = await db()

await dbClient.connect()
export default dbClient