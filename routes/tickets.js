import { Router } from "express";
import { ObjectId } from "mongodb";
import dbClient from "../dbClient.js";

const router = Router()

router.post('/add', async (req, res) => {
    const { ticketName, ticketPriority, assignedTo } = req.body
    console.log("I am req body", req.body)
    if (!ticketName || !ticketPriority || !assignedTo) {
        res.status(400).send({ message: "Key parameters missing, try again" })
    }
    await dbClient.db("firstOfMany").collection("tickets").insertOne({
        ticketName: ticketName,
        ticketPriority: parseInt(ticketPriority),
        assignedTo: assignedTo,
        createdAt: new Date().toISOString()
    })
    res.status(200).send("Successfully added")
})

router.get('/get', async (req, res) => {
    let query = req.query ?? {}
    let tickets;
    if (Object.keys(query).length > 0) {
        // TODO: Add a generalized format for queries, support 
        if (!!query._id) {
            query = { ...query, _id: new ObjectId(query?._id) }
        }
        tickets = await dbClient.db("firstOfMany").collection("tickets").findOne(query)
    }
    else {
        tickets = await dbClient.db("firstOfMany").collection("tickets").find(query)?.toArray()
    }
    res.status(200).send({
        tickets: tickets
    })
})

router.delete('/delete', async (req, res) => {
    const { id } = req.query
    console.log(id)
    await dbClient.db("firstOfMany").collection("tickets").findOneAndDelete({
        _id: new ObjectId(id)
    })
    res.status(200).send("Successfully deleted")
})

export { router as TicketRouter }