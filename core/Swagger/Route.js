export default class Route
{
    constructor(definition)
    {
        this.definition = definition;
    }

    getMiddlewares()
    {
        let middlewares = [];
        for (let middlewareIdx in this.definition.middlewares)
        {
            let middleware = this.definitionn.middlewares[middlewareIdx];
            let middlewarefn = this.app.middlewares[middleware]["handle"];
            middlewares.push(middlewarefn);
        }
    }
}
