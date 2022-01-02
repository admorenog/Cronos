import SwaggerExtractor from '$core/Swagger/Extractor';
import DependencyManager from '$core/Dependency/DependencyManager';

export default class Kernel
{
    _dependencyManager: DependencyManager;
    _extractor: SwaggerExtractor;
    _prefix: string;

    constructor(dependencyManager: DependencyManager)
    {
        this._dependencyManager = dependencyManager;
    }

    extractor(extractor : SwaggerExtractor) : this
    {
        this._extractor = extractor;
        return this;
    }

    prefix(prefix : string) : this
    {
        this._prefix = prefix;
        return this;
    }

    endpoints() : object[]
    {
        const routes = this._extractor.getRoutes();

        const endpoints: object[] = [];

        for (const idxRoute in routes)
        {
            const route = routes[idxRoute];
            const middlewares = [];
            for (const idx in route.middlewares)
            {
                const middlewareName = route.middlewares[idx];
                middlewares.push(this._dependencyManager.get(middlewareName + "@handle"));
            }

            const controller = this._dependencyManager.get(route.controller);

            const path = this._prefix + route.path.replace(/\{(.*)\}/g, ":$1");
            const method = route.method;
            endpoints.push({ method, path, middlewares, controller });
        }
        return endpoints;
    }
}
