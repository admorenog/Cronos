import * as core from 'express-serve-static-core';

export default class ApiJsonMiddleware
{
    handle(request: core.Request, response: core.Response, next: core.NextFunction)
    {
        response.setHeader('Content-Type', 'application/json');

        next();
    }
}
