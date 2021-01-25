import express from 'express';

const router = express.Router();

/**
 * https://web.postman.co/workspace/My-Workspace~dca240fb-157d-40f0-8f9b-d32dbad1752b/request/14316927-72012e66-8e7a-4d27-80a9-9f2bc718392d
 * 
 * This endpoint is for demonstration purposes only.
 * Demonstrates different ways of sending information to server and
 * the server returning information back to client.
 *  
 */
router.post('/events/:id.json', // ex. /events/abc.json
    (request: express.Request, response: express.Response) => {
        // Request logic

        // extract an URL parameter
        const idUrlParam: string =
            request.params.id.toString();

        // extract a Query Parameter
        const numberQueryParam: string | undefined =
            request.query.number?.toString();

        // extract a header value
        const eventHeader: string | undefined =
            request.header('X-EVENT-HEADER');

        const body: string | undefined = request.body;

        console.log('body', body);

        // Response logic

        // 1 second = 1000ms, 2 hours = 7200000ms
        const twoHoursMs = 1000 * 60 * 60 * 2;
        const now = new Date();
        const twoHoursFromNow =
            new Date(now.getTime() + twoHoursMs);

        // return user session cookie
        response.cookie(
            'user-session',
            '***userSessionValue***',
            { expires: twoHoursFromNow }
        );

        response.setHeader(
            'X-RATE-LIMIT-BUDGET', 60
        );

        response.json({
            ok: true,
            id_param: idUrlParam,
            number_param: numberQueryParam,
            event_header: eventHeader,
            now_date: new Date().toISOString(),
            body_value: body
        })
    });

module.exports = router;