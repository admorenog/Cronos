import path from 'path';
import fs from 'fs';

export default class SwaggerExtractor
{
    constructor()
    {
        this.swaggers = [];
        this.routes = [];
        this.components = {};
        this.loadSwaggers();
    }

    loadSwaggers()
    {
        let routesPath = path.join(__dirname, "../../routes");
        let swaggers = fs.readdirSync(routesPath);

        for (let idxSwagger in swaggers)
        {
            let swaggerFileName = swaggers[idxSwagger];
            let swaggerPath = path.join(routesPath, swaggerFileName);
            let swaggerAsJson = fs.readFileSync(swaggerPath);
            this.swaggers.push({
                filename: swaggerFileName,
                swagger: JSON.parse(swaggerAsJson)
            });
        }
    }

    loadRoutesFromSwaggers()
    {
        for (let idxSwagger in this.swaggers)
        {
            let swagger = this.swaggers[idxSwagger].swagger;

            let paths = swagger.paths;
            for (let path in paths)
            {
                let methods = paths[path];
                for (let method in methods)
                {
                    let methodInfo = methods[method];
                    let middlewares = methodInfo["x-middlewares"];
                    let controller = methodInfo["x-controller"];

                    if (!this.isRouteAlreadyDefined(path, method))
                    {
                        this.routes.push({ path, method, middlewares, controller });
                    }
                    else
                    {
                        console.error(`The route ${method} ${path} is already defined, skipping.`);
                    }
                }
            }
        }
    }

    loadComponentsFromSwaggers()
    {
        for (let idxSwagger in this.swaggers)
        {
            let filename = this.swaggers[idxSwagger].filename;
            let swagger = this.swaggers[idxSwagger].swagger;

            if (typeof swagger.components != typeof undefined
                && typeof swagger.components.schemas != typeof undefined)
            {
                let components = swagger.components.schemas;
                for (let componentName in components)
                {
                    let component = components[componentName];
                    component.filename = filename;
                    if (typeof this.components[componentName] == typeof undefined)
                    {
                        this.components[componentName] = [];
                    }
                    this.components[componentName].push(component);
                }
            }
        }
    }

    getRoutes()
    {
        this.loadRoutesFromSwaggers();
        return this.routes;
    }

    getComponents()
    {
        this.loadComponentsFromSwaggers();
        return this.components;
    }

    isRouteAlreadyDefined(path, method)
    {
        return this.routes.filter(route =>
        {
            route.path == path && route.method == method
        }).length > 0;
    }
}
