import { Server } from "http";
import { app } from "./app";
import { closeClientsOnExit } from "./clients/close";
import { config } from "./config";
import { logger, LogLevel, setLogLevel } from './logger';

if (!config.isProduction) {
    setLogLevel(LogLevel.DEBUG);
}

const port = process.env.PORT || 3000;
const server: Server = app.listen(
    process.env.PORT || 3000,
    () => {
        logger.info(`Server is running port=${port}`);
    }
);

closeClientsOnExit(server);