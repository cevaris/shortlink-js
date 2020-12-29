import { Server } from "http";
import { firebaseDb } from "./firebaseClient";
import { pubSubClient } from "./pubsubClient";

export function shutdownClientsOnExit(server: Server) {
    async function close() {
        console.log('About to exit, waiting for remaining connections to complete...');
        server.close();

        try {
            await pubSubClient.close()
            console.error('pub/sub client closed');
        } catch (error) {
            console.error('could not close pub/sub client');
        }

        try {
            await firebaseDb.terminate();
            console.error('firebase client closed');
        } catch (error) {
            console.error('could not close pub/sub client');
        }
    }

    process.on('SIGINT', close);
    process.on('SIGTERM', close);
    process.on('uncaughtException', close);
}