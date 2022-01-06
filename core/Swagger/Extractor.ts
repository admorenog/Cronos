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

        for (const idxSwagger in swaggers)
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
        for (const idxSwagger in this.swaggers)
        {
            const swagger = this.swaggers[idxSwagger].swagger;

            const paths = swagger.paths;
            for (const route in paths)
            {
                const path = paths[route];
                for (const verb in path)
                {
                    const methodInfo = path[verb];
                    const middlewares = methodInfo["x-middlewares"] || [];
                    const controller = methodInfo["x-controller"];
                    if (!this.isRouteAlreadyDefined(route, verb))
                    {
                        this.routes.push({ verb, route, middlewares, controller });
                    }
                    else
                    {
                        console.error(`The route ${verb} ${route} is already defined, skipping.`);
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
        console.log(method);

        return responses;
    }

    loadComponentsFromSwaggers()
    {
        for (const idxSwagger in this.swaggers)
        {
            const filename = this.swaggers[idxSwagger].filename;
            const swagger = this.swaggers[idxSwagger].swagger;

            if (typeof swagger.components != typeof undefined
                && typeof swagger.components.schemas != typeof undefined)
            {
                const components = swagger.components.schemas;
                for (const componentName in components)
                {
                    const component = components[componentName];
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

    getComponents()
    {
        this.loadComponentsFromSwaggers();
        return this.components;
    }

    isRouteAlreadyDefined(path : string, method : string)
    {
        return this.routes.filter(route =>
        {
            route.path == path && route.method == method
        }).length > 0;
    }
}
