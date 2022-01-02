import Env from '$models/Env';

export default class EnvController
{
    async index(request, response)
    {
        const env = new Env();
        const listOfEnv = await env.get();

        response.end(JSON.stringify(listOfEnv));
    };
    async store(request, response)
    {
        const env = new Env();
        const listOfEnv = await env.get();

        response.end(JSON.stringify(listOfEnv));
    };
}
