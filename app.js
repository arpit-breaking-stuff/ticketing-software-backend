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
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', AppEnv.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/ticket', TicketRouter)

app.listen(PORT, (error) => {
    if (!error)
        wlf.info("Server is Successfully Running, and App is listening on port " + PORT)
    else
        wlf.error("Error occurred, server can't start", error);
});
