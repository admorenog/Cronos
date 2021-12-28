export default class Kernel
{
    constructor(app)
    {
        this._app = app;
        this._prefix = '';
        this._extractor = null;
    }

    extractor(extractor)
    {
        this._extractor = extractor;
        return this;
    }

    prefix(prefix)
    {
        this._prefix = prefix;
        return this;
    }

    loadRoutes()
    {
        let routes = this._extractor.getRoutes();

        for (let idxRoute in routes)
        {
            let route = routes[idxRoute];
            let middlewares = [];
            for (let middlewareIdx in route.middlewares)
            {
                let middleware = route.middlewares[middlewareIdx];
                let middlewarefn = this._app.middlewares[middleware]["handle"];
                middlewares.push(middlewarefn);
            }

            let controllerName = route.controller.split("@")[0];
            let fnName = route.controller.split("@")[1];
            let controllerFn = this._app.controllers[controllerName][fnName];
            let path = this._prefix + route.path.replace(/\{(.*)\}/g, ":$1");
            console.log({ method: route.method, path, middlewares, controllerFn });
            this._app[route.method](path, ...middlewares, controllerFn);
        }
    }
}
