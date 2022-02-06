import DependencyManager from '$core/Dependency/DependencyManager';
import Router from '$core/Routes/Router';

export default class Kernel
{
    _dependencyManager: DependencyManager;
    _routes: Router;
    _prefix: string = "";

    constructor(router : Router)
    {
        this._routes = router;
    }

    dependencyManager(dependencyManager: DependencyManager) : this
    {
        this._dependencyManager = dependencyManager;
        return this;
    }

    prefix(prefix : string) : this
    {
        this._prefix += prefix;
        return this;
    }

    endpoints() : object[]
    {
        const routes = this._routes.get();

        const endpoints: object[] = [];

        for (const idxRoute of Object.keys(routes))
        {
            const route = routes[idxRoute];
            const middlewares = [];
            for (const idx of Object.keys(route.middlewares))
            {
                const middlewareName = route.middlewares[idx];
                middlewares.push(this._dependencyManager.get(middlewareName + "@handle"));
            }

            const controller = this._dependencyManager.get(route.controller);

            const path = this._prefix + route.path.replace(/\{(.*)\}/g, ":$1");
            const method = route.verb;
            endpoints.push({ method, path, middlewares, controller });
        }
        return endpoints;
    }
}
