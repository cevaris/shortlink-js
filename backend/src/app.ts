import express from 'express';

export const app = express();

// parse all json request body as object
app.use(express.json());

app.use(require('./routes/root'));
app.use(require('./routes/shorten'));
app.use(require('./routes/expand'));