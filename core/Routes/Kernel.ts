import SwaggerExtractor from '$core/Swagger/Extractor';
import DependencyManager from '$core/Dependency/DependencyManager';

export default class Kernel
{
    _dependencyManager: DependencyManager;
    _extractor: SwaggerExtractor;
    _prefix: string = "";

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
        const paths = this._extractor.getRoutes();

        const endpoints: object[] = [];

        for (const idxPath in paths)
        {
            const path = paths[idxPath];
            const middlewares = [];
            for (const idx in path.middlewares)
            {
                const middlewareName = path.middlewares[idx];
                middlewares.push(this._dependencyManager.get(middlewareName + "@handle"));
            }

            const controller = this._dependencyManager.get(path.controller);

            const route = this._prefix + path.route.replace(/\{(.*)\}/g, ":$1");
            const method = path.verb;
            endpoints.push({ method, route, middlewares, controller });
        }
        return endpoints;
    }
}
