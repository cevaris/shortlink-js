import { Server } from "http";
import { app } from "./app";
import { closeClientsOnExit } from "./clients/close";
import { logger, LogLevel, setLogLevel } from './logger';

if (process.env.NODE_ENV?.toString() !== 'production') {
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