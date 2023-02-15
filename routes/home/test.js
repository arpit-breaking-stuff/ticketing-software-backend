
import { app } from "../../app.js";
import { wlf } from "../../utils/logger.js";

app.get('/', (req, res) => {
    wlf.info("Testing logging: Successful")
    res.status(200).send("Successful response");
});

app.get('/home', (req, res) => {
    try{
        throw new Error("Internal Error")
        res.send("Error")
    } catch(err) {
        wlf.error("An internal Error happened", err)
        res.status(500).send("Error")
    }
});
