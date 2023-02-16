import { AppEnv } from './AppEnv.js';
import express from 'express'
import { wlf } from './utils/logger.js';
import { TicketRouter } from './routes/tickets.js';
import bodyParser from 'body-parser';

const logger = (req, res, done) => {
    wlf.info(`${req.method} ${req.url}`)
    done()
}

export const app = express();
const PORT = AppEnv.PORT || 3000

app.use(logger)
app.use(bodyParser.json())
app.use('/ticket', TicketRouter)

app.listen(PORT, (error) => {
    if (!error)
        wlf.info("Server is Successfully Running, and App is listening on port " + PORT)
    else
        wlf.error("Error occurred, server can't start", error);
});
