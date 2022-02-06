import path from 'path';
import fs from 'fs';
import Router from '$core/Routes/Router';

export default class Swagger implements Router
{
	swaggersPath: string = null;
    swaggers: {swagger: any, filename: string}[] = [];
    routes: any[] = [];

    constructor(swaggersPath: string)
    {
        this.swaggersPath = swaggersPath;
		this.loadRoutesFromSwaggers();
    }

    get()
    {
        return this.routes;
    }

    loadRoutesFromSwaggers()
    {
		this.loadSwaggers();
		this.loadRoutes();
    }

    loadSwaggers()
    {
        const swaggersFileNames = fs.readdirSync(this.swaggersPath);
		const swaggers = this.getSwaggers(swaggersFileNames);
		this.swaggers = this.swaggers.concat(swaggers);
    }

	getSwaggers(swaggerFileNames: string[]) : {swagger: any, filename: string}[]
	{
		const swaggers: {swagger: any, filename: string}[] = [];

        for (const idxSwagger of Object.keys(swaggerFileNames))
        {
            const filename = swaggerFileNames[idxSwagger];
			const swagger = this.getSwagger(filename);
			swaggers.push({ filename, swagger });
        }

		return swaggers;
	}

	getSwagger(swaggerFileName: string) : {}
	{
		const swaggerPath = path.join(this.swaggersPath, swaggerFileName);
		const swaggerAsJson = fs.readFileSync(swaggerPath).toString();
		return JSON.parse(swaggerAsJson);
	}

	loadRoutes() {
        for (const idxSwagger of Object.keys(this.swaggers))
        {
            const swagger = this.swaggers[idxSwagger].swagger;
			const routes = this.getRoutes(swagger.paths);
			this.routes = this.routes.concat(routes);
        }
	}

	getRoutes(paths: []) : any[] {
		let routes = [];
		for (const path of Object.keys(paths))
		{
			const routeInfo = paths[path];
			const verbs = this.getVerbs(path, routeInfo);
			routes = routes.concat(verbs);
		}
		return routes;
	}

	getVerbs(path: string , routeInfo: {}) : {}[]
	{
		const verbs: {}[] = [];
		for (const verb of Object.keys(routeInfo))
		{
			const method = routeInfo[verb];
			const methodInfo = this.getMethodInfo(verb, path, method);
			verbs.push(methodInfo);
		}
		return verbs;
	}

	getMethodInfo(verb: string, path: string, method: string) : {}
	{
		if (this.isRouteDefined(path, verb)) {
			throw new Error(`The path ${verb} ${path} is already defined, skipping.`);
		}

		return {
			verb,
			path,
			method,
			middlewares: method["x-middlewares"] || [],
			controller: method["x-controller"],
		};
	}

    isRouteDefined(newPath : string, newMethod : string)
    {
		return this.routes.filter(route =>
		{
			return (route.path === newPath
				&& route.method === newMethod);
		}).length > 0;
    }
}
