import * as core from 'express-serve-static-core';

export default class Exception {
	public static handler (err: any, req: core.Request, res: core.Response, next: core.NextFunction)
    {
        const data : any = {};
        const statusCode = err.statusCode || 500;

        data.message = err.message || 'Internal Server Error';

        if (process.env.NODE_ENV === 'development' && err.stack)
        {
            data.stack = err.stack;
        }

        if (statusCode >= 400)
        {
            // tslint:disable-next-line:no-console
            console.error(err);
        }

        res.status(statusCode).json(data);
    }
}
