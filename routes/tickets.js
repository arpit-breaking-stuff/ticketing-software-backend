import { Router } from "express";
import { ObjectId } from "mongodb";
import dbClient from "../dbClient.js";

const router = Router()

router.post('/add', async (req, res) => {
    const { ticketName, ticketPriority, assignedTo } = req.body
    if (!ticketName || !ticketPriority || !assignedTo) {
        res.status(400).send({ message: "Key parameters missing, try again" })
    }
    await dbClient.db("firstOfMany").collection("tickets").insertOne({
        ticketName: ticketName,
        ticketPriority: ticketPriority,
        assignedTo: assignedTo
    })
    res.status(200).send("Successfully added")
})

router.get('/get', async (req, res) => {
    const cursor = dbClient.db("firstOfMany").collection("tickets").find()
    const tickets = await cursor.toArray()
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