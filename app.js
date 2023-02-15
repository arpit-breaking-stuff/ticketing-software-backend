import { AppEnv } from './AppEnv.js';
import express from 'express'

import "./routes/home/test.js"
import { wlf } from './utils/logger.js';


const logger = (req, res, done) => {
    wlf.info(`${req.method} ${req.url}`)
    done()
}

export const app = express();
const PORT = AppEnv.PORT || 3000

app.use(logger)
app.listen(PORT, (error) => {
    if (!error)
        wlf.info("Server is Successfully Running, and App is listening on port " + PORT)
    else
        wlf.error("Error occurred, server can't start", error);
});
