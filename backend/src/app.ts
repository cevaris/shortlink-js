import cors from 'cors';
import express from 'express';

export const app: express.Express = express();

// parse all json request body as object
app.use(express.json());


// allow CORS from select origins
const corsOptions = {
    origin: [
        'http://localhost:4200',                // development
        'https://project-id-shortlink.web.app', // production frontend web app
    ],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


// import routes
app.use(require('./routes/root'));
app.use(require('./routes/links'));