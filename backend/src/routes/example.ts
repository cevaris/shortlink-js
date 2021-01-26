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
router.post('/example/:id.json', // ex. /example/abc.json
    (request: express.Request, response: express.Response) => {
        // Request logic

        // extract an URL parameter
        const idUrlParam: string =
            request.params.id.toString();

        // extract a Query Parameter
        const baseQueryParam: string | undefined =
            request.query.base?.toString();
        const exponentQueryParam: string | undefined =
            request.query.exponent?.toString();
        const expResult = baseQueryParam && exponentQueryParam ?
            Math.pow(parseFloat(baseQueryParam), parseFloat(exponentQueryParam)) : undefined;

        // extract a header value
        const eventHeader: string | undefined =
            request.header('X-EVENT-HEADER');

        const body: string | undefined = request.body;



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

        response
            .status(200)
            .json({
                id_param: idUrlParam,
                base_param: baseQueryParam,
                exponent_param: exponentQueryParam,
                exponent_result: expResult,
                event_header: eventHeader,
                body_value: body
            })
    });

module.exports = router;