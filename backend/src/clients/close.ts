import { Server } from "http";
import { logger } from "../logger";
import { firebaseDb } from "./firebaseClient";
import { pubSubClient } from "./pubsubClient";


// https://gist.github.com/nfantone/1eaa803772025df69d07f4dbf5df7e58
export function closeClientsOnExit(server: Server) {
    function close() {
        logger.info('About to exit, waiting for remaining connections to complete...');
        server.close(async () => {
            try {
                await pubSubClient.close();
                logger.info('pub/sub client successfully closed.');
            } catch (error) {
                logger.error('failed to close pub/sub client', error);
            }

            try {
                await firebaseDb.terminate();
                logger.info('firebase client successfully closed.');
            } catch (error) {
                logger.error('failed to close firebase client', error);
            }
        });
    }

    process.on('SIGINT', close);  // CTRL+c
    process.on('SIGTERM', close); // Node shutdown
    process.on('SIGQUIT', close); // CTRL+\
    process.on('uncaughtException', close);
}