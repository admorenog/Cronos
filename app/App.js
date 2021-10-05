import moment from 'moment';
import mime from 'mime-types';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import path from 'path';
import basicAuth from 'express-basic-auth';
import cors from 'cors';

import paths from '$helpers/paths';
import SwaggerExtractor from '$helpers/SwaggerExtractor';

export default class App
{
    constructor()
    {
        this.app = express();
    }

    async setConfig()
    {
        express.static.mime.define({ 'application/javascript': ['vue'] });

        this.app.set('host', (process.env.HOST || '127.0.0.1'));
        this.app.set('port', (process.env.PORT || 8000));

        // error handler
        this.app.use(function (err, req, res, next)
        {
            var data = {};
            var statusCode = err.statusCode || 500;

            data.message = err.message || 'Internal Server Error';

            if (process.env.NODE_ENV === 'development' && err.stack)
            {
                data.stack = err.stack;
            }

            if (statusCode >= 400)
            {
                console.error(err);
            }

            res.status(statusCode).json(data);
        });

        process.on('SIGINT', this.quit);
        process.on('SIGTERM', this.quit);
    }

    async setBasicAuth()
    {
        let BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
        let BASIC_AUTH_PWD = process.env.BASIC_AUTH_PWD;

        if (BASIC_AUTH_USER && BASIC_AUTH_PWD)
        {
            this.app.use(function (req, res, next)
            {
                res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"')
                next();
            });

            this.app.use(basicAuth({
                users: {
                    [BASIC_AUTH_USER]: BASIC_AUTH_PWD
                }
            }))
        }
    }

    async loadPlugins()
    {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // to support file uploads
        this.app.use(busboy());

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "config")));
        this.app.set('views', path.join(__dirname, "public"));
    }

    async loadControllers()
    {
        this.app.controllers = {};
        let controllersPath = paths.controllers();
        let controllers = fs.readdirSync(controllersPath);

        for (let idxController in controllers)
        {
            let controllerFile = controllers[idxController];
            let controllerName = controllerFile.replace(".js", "");
            let controllerPath = path.join(controllersPath, controllerFile);
            const { default: controller } = await import(controllerPath);
            this.app.controllers[controllerName] = new controller();
        }
    }

    async loadMiddlewares()
    {
        this.app.middlewares = {};
        let middlewaresPath = paths.middlewares();
        let middlewares = fs.readdirSync(middlewaresPath);

        for (let idxMiddleware in middlewares)
        {
            let middlewareFile = middlewares[idxMiddleware];
            let middlewareName = middlewareFile.replace(".js", "");
            let middlewarePath = path.join(middlewaresPath, middlewareFile);
            const { default: middleware } = await import(middlewarePath);
            this.app.middlewares[middlewareName] = new middleware();
        }
    }

    async loadRoutes()
    {
        let swaggerExtractor = new SwaggerExtractor();
        let routes = swaggerExtractor.getRoutes();

        for (let idxRoute in routes)
        {
            let route = routes[idxRoute];
            let middlewares = [];
            for (let middlewareIdx in route.middlewares)
            {
                let middleware = route.middlewares[middlewareIdx];
                let middlewarefn = this.app.middlewares[middleware]["handle"];
                middlewares.push(middlewarefn);
            }

            let controllerName = route.controller.split("@")[0];
            let fnName = route.controller.split("@")[1];
            let controllerFn = this.app.controllers[controllerName][fnName];
            let path = route.path.replace(/\{(.*)\}/g, ":$1");
            console.log({ method: route.method, path, middlewares, controllerFn });
            this.app[route.method](path, ...middlewares, controllerFn);
        }
    }

    async loadMocks()
    {
        let swaggerExtractor = new SwaggerExtractor();
        let routes = swaggerExtractor.getRoutes();

        for (let idxRoute in routes)
        {
            let route = routes[idxRoute];
            let middlewares = [];
            for (let idxMiddleware in route.middlewares)
            {
                let middleware = route.middlewares[idxMiddleware];
                let middlewarefn = this.app.middlewares[middleware]["handle"];
                middlewares.push(middlewarefn);
            }

            let example = {};
            let controllerFn = function (request, response)
            {
                response.end(JSON.stringify(example));
            };
            let path = '/__mock' + route.path.replace(/\{(.*)\}/g, ":$1");
            let method = route.method;
            console.log({ method, path, middlewares, controllerFn });
            this.app[method](path, ...middlewares, controllerFn);
        }
    }

    async loadComponentDefinitions()
    {
        let swaggerExtractor = new SwaggerExtractor();
        let components = swaggerExtractor.getComponents();

        for (let componentName in components)
        {
            let uri = `/__component/definition/${componentName}`;
            this.app.get(uri, async function (req, res)
            {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(components[componentName]));
            });
        }
    }

    listen()
    {
        let self = this;
        this.app.listen(this.app.get('port'), this.app.get('host'), function ()
        {
            fs.access(paths.db(), fs.W_OK, function (err)
            {
                if (err)
                {
                    console.error("Write access to", paths.db(), "DENIED.");
                    process.exit(1);
                }
            });
            console.log("Cronos is running at http://" + self.app.get('host') + ":" + self.app.get('port'));
        });
    }

    quit()
    {
        console.log("Exiting cronos");
        process.exit();
    }
}
