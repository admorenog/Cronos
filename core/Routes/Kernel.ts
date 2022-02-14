import DependencyManager from '$core/Dependency/DependencyManager';
import Router from '$core/Routes/Router';

export default class Kernel
{
    _dependencyManager: DependencyManager;
    _routes: Router;
    _prefix: string = "";

    public constructor(router : Router)
    {
        this._routes = router;
    }

    public dependencyManager(dependencyManager: DependencyManager) : this
    {
        this._dependencyManager = dependencyManager;
        return this;
    }

    public prefix(prefix : string) : this
    {
        this._prefix += prefix;
        return this;
    }

    public endpoints() : object[]
    {
        const routes = this._routes.get();

        const endpoints: object[] = [];

        for (const idxRoute of Object.keys(routes))
        {
            const route = routes[idxRoute];

            const middlewares = this.getMiddlewaresDependencies(route.middlewares);
            const controller = this._dependencyManager.get(route.controller);
            const path = this._prefix + route.path.replace(/\{(.*)\}/g, ":$1");
            const method = route.verb;
            endpoints.push({ method, path, middlewares, controller });
        }
        return endpoints;
    }

    private getMiddlewaresDependencies(middlewareNames: string[]) : any[]
    {
        const middlewares = [];
        for (const idx of Object.keys(middlewareNames))
        {
            const middlewareName = middlewareNames[idx];
            const middleware = this._dependencyManager.get(middlewareName + "@handle");
            middlewares.push(middleware);
        }
        return middlewares;
    }
}
