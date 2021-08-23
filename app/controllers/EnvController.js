import Env from '$models/Env';

export default class EnvController
{
    async index(request, response)
    {
        let env = new Env();
        let listOfEnv = await env.get();

        response.end(JSON.stringify(listOfEnv));
    };
    async store(request, response)
    {
        let env = new Env();
        let listOfEnv = await env.get();

        response.end(JSON.stringify(listOfEnv));
    };
}
