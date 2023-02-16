import dbClient from "./dbClient.js"

async function main() {
    await dbClient
        .db("firstOfMany")
        .createCollection("tickets", {
            capped: true,
            size: 5242880,
            max: 5000,
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["ticketName", "ticketPriority", "assignedTo"],
                    properties: {
                        ticketName: {
                            bsonType: "string",
                        },
                        ticketPriority: {
                            bsonType: "int",
                        },
                        assignedTo: {
                            bsonType: "string"
                        }
                    }
                }
            }
        })

    await dbClient.db('firstOfMany').collection('tickets').createIndex({assignedTo: "text"}, {ticketName: "text"}, {ticketPriority: 'text'})
    console.log("Successfully Created Collection")
}

main()