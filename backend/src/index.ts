import { Server } from "http";
import { app } from "./app";
import { closeClientsOnExit } from "./clients/close";

const port = process.env.PORT || 3000;
const server: Server = app.listen(
    process.env.PORT || 3000,
    () => {
        console.log(`Server is running port=${port}`);
    }
);

closeClientsOnExit(server);