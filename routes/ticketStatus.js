import { Router } from "express";
import { ObjectId } from "mongodb";
import dbClient from "../dbClient.js";

const router = Router()

router.post('/add', async (req, res) => {
    const { status } = req.body
    if (!status) {
        res.status(400).send({ message: "Key parameters missing, try again" })
    }

    await dbClient.db("firstOfMany").collection("ticketStatus").insertOne({
        ticketStatus: status
    })
    res.status(200).send("Successfully added")
})

router.get('/get', async (req, res) => {
    const status = await dbClient.db("firstOfMany").collection("ticketStatus").find().toArray()
    res.status(200).send({
        ticketStatus: status
    })
})

router.delete('/delete', async (req, res) => {
    const { statusName } = req.query
    await dbClient.db("firstOfMany").collection("ticketStatus").findOneAndDelete({
        ticketStatus: statusName
    })
    res.status(200).send("Successfully deleted")
})


export { router as TicketStatusRouter }