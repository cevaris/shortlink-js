import express from 'express';

export const app: express.Express = express();

// parse all json request body as object
app.use(express.json());


// allow CORS from select origins
const allowedOrigins = [
    'http://localhost:4200',                         // development
    'https://project-id-shortlink.web.app',          // frontend web app
    'https://project-id-shortlink.wm.r.appspot.com', // via web browser
];
function allowCrossDomain(req: express.Request, res: express.Response, next: Function) {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const origin = req.headers.origin;
    if (origin && allowedOrigins.indexOf(origin) >= 0) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}
app.use(allowCrossDomain);

// import routes
app.use(require('./routes/root'));
app.use(require('./routes/shorten'));
app.use(require('./routes/expand'));