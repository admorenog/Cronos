import path from 'path';
import fs from 'fs';
import Paths from '$modules/Paths';

export default class Extractor
{
    swaggers: {swagger: any, filename: string}[] = [];
    routes: any[] = [];
    components: {} = {};

    constructor()
    {
        this.loadSwaggers();
    }

    getRoutes()
    {
        this.loadRoutesFromSwaggers();
        return this.routes;
    }

    loadSwaggers()
    {
        const routesPath = Paths.routes();
        const swaggers = fs.readdirSync(routesPath);

        for (const idxSwagger of Object.keys(swaggers))
        {
            const swaggerFileName = swaggers[idxSwagger];
            const swaggerPath = path.join(routesPath, swaggerFileName);
            const swaggerAsJson = fs.readFileSync(swaggerPath).toString();
            this.swaggers.push({
                filename: swaggerFileName,
                swagger: JSON.parse(swaggerAsJson)
            });
        }
    }

    loadRoutesFromSwaggers()
    {
        for (const idxSwagger of Object.keys(this.swaggers))
        {
            const swagger = this.swaggers[idxSwagger].swagger;

            const paths = swagger.paths;
            for (const route of Object.keys(paths))
            {
                const pathInfo = paths[route];
                for (const verb of Object.keys(pathInfo))
                {
                    const method = pathInfo[verb];
                    const middlewares = method["x-middlewares"] || [];
                    const controller = method["x-controller"];
                    if (!this.isRouteAlreadyDefined(route, verb))
                    {
                        this.routes.push({ verb, route, middlewares, controller });
                    }
                    else
                    {
                        throw new Error(`The route ${verb} ${route} is already defined, skipping.`);
                    }
                }
            }
        }
    }

    getResponses(method)
    {
        const responses = {};
        // let methodResponses = method.responses || {};
        // for (let httpCode in methodResponses)
        // {
        //     let content = methodResponses[httpCode].content["application/json"].schema
        //     responses[httpCode]
        // }

        return responses;
    }

    loadComponentsFromSwaggers()
    {
        for (const idxSwagger of Object.keys(this.swaggers))
        {
            const filename = this.swaggers[idxSwagger].filename;
            const swagger = this.swaggers[idxSwagger].swagger;

            if (typeof swagger.components !== typeof undefined
                && typeof swagger.components.schemas !== typeof undefined)
            {
                const components = swagger.components.schemas;
                for (const componentName of Object.keys(components))
                {
                    const component = components[componentName];
                    component.filename = filename;
                    if (typeof this.components[componentName] === typeof undefined)
                    {
                        this.components[componentName] = [];
                    }
                    this.components[componentName].push(component);
                }
            }
        }
    }

    getComponents()
    {
        this.loadComponentsFromSwaggers();
        return this.components;
    }

    isRouteAlreadyDefined(newPath : string, newMethod : string)
    {
        return this.routes.filter(route =>
        {
            return route.path === newPath && route.method === newMethod
        }).length > 0;
    }
}
