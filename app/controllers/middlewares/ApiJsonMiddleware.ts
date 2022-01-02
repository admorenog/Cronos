export default class ApiJsonMiddleware
{
    handle(request, response, next)
    {
        response.setHeader('Content-Type', 'application/json');

        next();
    }
}
