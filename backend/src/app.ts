import express from 'express';
import cors from 'cors';

export const app: express.Express = express();

// parse all json request body as object
app.use(express.json());


// allow CORS from select clients
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
    origin: function (origin: string | undefined, callback: Function) {
        if (origin && allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`Origin Not "${origin}" allowed by CORS`))
        }
    }
}
app.use(cors(corsOptions));

// import routes
app.use(require('./routes/root'));
app.use(require('./routes/shorten'));
app.use(require('./routes/expand'));