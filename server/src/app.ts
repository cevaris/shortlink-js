import express from 'express';

export const app = express();

app.use(require('./routes/root'));
app.use(require('./routes/shorten'));