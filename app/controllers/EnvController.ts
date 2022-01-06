import * as core from 'express-serve-static-core';
import Env from '$models/Env';

export default class EnvController
{
    async index(request: core.Request, response: core.Response)
    {
        const env = new Env();
        const listOfEnv = await env.get();

        response.end(JSON.stringify(listOfEnv));
    };
    async store(request: core.Request, response: core.Response)
    {
        const env = new Env();
        const listOfEnv = await env.get();

        response.end(JSON.stringify(listOfEnv));
    };
}
