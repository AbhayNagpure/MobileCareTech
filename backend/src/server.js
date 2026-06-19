import dotenv from "dotenv";
import {app} from "./app.js";
import connectDB from "./db/index.js";
import { logger } from "./utils/logger.js";

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            logger.info(`Server is running on port: ${PORT}`);
        })
    })
    .catch((error) => {
        logger.error(`MongoDB connection failed in server.js: ${error.message}`);
    })