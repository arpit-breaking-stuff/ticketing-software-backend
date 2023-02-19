import { Router } from "express";
import { ObjectId } from "mongodb";
import dbClient from "../dbClient.js";
import { isWhitespace } from "../utils/isWhitespace.js";

const router = Router()

router.post('/add', async (req, res) => {
    const { ticketName, ticketPriority, assignedTo, ticketStatus } = req.body
    if (!ticketName || !ticketPriority || !assignedTo || !ticketStatus) {
        return res.status(400).send({ message: "Ticket name, ticket priority, assigned to or ticket status can't be empty." })
    }

    if (Object.values(req.body).filter(isWhitespace).length > 0) {
        return res.status(400).send({ message: "One or more fields comprising of whitespace characters, please try again." })
    }

    await dbClient.db("firstOfMany").collection("tickets").insertOne({
        ...req.body,
        ticketStatus: ticketStatus,
        ticketPriority: parseInt(ticketPriority),
        createdAt: new Date().toISOString()
    })
    return res.status(200).send("Successfully added")
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
        tickets = [tickets]
    }
    else {
        tickets = await dbClient.db("firstOfMany").collection("tickets").find(query)?.toArray()

    }

    const ticketStatus = await dbClient.db("firstOfMany").collection("ticketStatus").find().toArray()
    const ticketStatusMap = new Map(ticketStatus?.map(item => [item._id.toString(), item.ticketStatus]))
    return res.status(200).send({
        tickets: tickets?.map((item) => {
            return { ...item, ticketStatus: ticketStatusMap.get(item?.ticketStatus) }
        }
        )
    })
})

router.delete('/delete', async (req, res) => {
    const { id } = req.query
    if(!id) {
        return res.status(400).send({message: 'Cannot delete a ticket without specifying ID.'})
    }
    await dbClient.db("firstOfMany").collection("tickets").findOneAndDelete({
        _id: new ObjectId(id)
    })
    return res.status(200).send("Successfully deleted")
})

export { router as TicketRouter }