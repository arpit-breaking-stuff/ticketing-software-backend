import { Router } from "express";
import { ObjectId } from "mongodb";
import dbClient from "../dbClient.js";
import { isWhitespace } from "../utils/isWhitespace.js";

const router = Router()

router.post('/add', async (req, res) => {
    const { status } = req.body
    if (!status || isWhitespace(status)) {
        return res.status(400).send({ message: "Key parameters missing, try again" })
    }

    await dbClient.db("firstOfMany").collection("ticketStatus").insertOne({
        ticketStatus: status
    })
    return res.status(200).send("Successfully added")
})

router.get('/get', async (req, res) => {
    const status = await dbClient.db("firstOfMany").collection("ticketStatus").find().toArray()
    return res.status(200).send({
        ticketStatus: status
    })
})

router.delete('/delete', async (req, res) => {
    const { _id } = req.query
    await dbClient.db("firstOfMany").collection("ticketStatus").findOneAndDelete({
        _id: new ObjectId(_id)
    })
    await dbClient.db("firstOfMany").collection("tickets").deleteMany({
        ticketStatus: _id
    })
    return res.status(200).send("Successfully deleted")
})


router.put('/update', async (req, res) => {
    const { newName, statusId } = req.query
    if (!newName || newName?.length === 0 || !statusId) {
        return res.status(400).send("Update Failed due to incomplete request")
    } 

    await dbClient.db("firstOfMany").collection("ticketStatus").updateOne({ _id: new ObjectId(statusId) }, {
        $set: {
            ticketStatus: newName
        }
    })
    return res.status(200).send("Successfully changed name")
})

export { router as TicketStatusRouter }