import moment from 'moment';
import mime from 'mime-types';
import fs from 'fs';
import express from 'express';
import * as core from 'express-serve-static-core';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import path from 'path';
import basicAuth from 'express-basic-auth';
import cors from 'cors';

import paths from '$modules/Paths';
import SwaggerExtractor from '$core/Swagger/Extractor';
import KernelRoutes from '$core/Routes/Kernel';
import DependencyResolver from '$core/Dependency/DependencyResolver';
import DependencyMock from '$core/Dependency/DependencyMock';

export default class App
{
    app: core.Express;
    swaggerExtractor: SwaggerExtractor;
    components: object;
    private _dependencyResolver: DependencyResolver;

    constructor()
    {
        this.app = express();

        this._dependencyResolver = new DependencyResolver();

        this.swaggerExtractor = new SwaggerExtractor();
    }

    async bootstrap() : Promise<void>
    {
        await this.setConfig();

        await this.setBasicAuth();

        await this.loadPlugins();

        await this._dependencyResolver.bootstrap();

        await this.loadComponentDefinitions();

        await this.loadRoutes();
    }

    async setConfig() : Promise<void>
    {
        express.static.mime.define({ 'application/javascript': ['vue'] });

        this.app.set('host', (process.env.HOST || '127.0.0.1'));
        this.app.set('port', (process.env.PORT || 8000));

        // error handler
        this.app.use(function (err, req, res, next)
        {
            const data : any = {};
            const statusCode = err.statusCode || 500;

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

    async setBasicAuth() : Promise<void>
    {
        const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
        const BASIC_AUTH_PWD = process.env.BASIC_AUTH_PWD;

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

    async loadPlugins() : Promise<void>
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

    async loadRoutes()
    {
        const routes = await this.getRoutes();
        this.registerRoutes(routes);

        // const mocks = await this.getMocks();
        // this.registerRoutes(mocks);
    }

    async registerRoutes(routes: any[])
    {
        for (const idxRoute in routes)
        {
            const route = routes[idxRoute];

            console.log(route);

            this.app[route.method](route.route, ...route.middlewares, route.controller);
        }
    }

    async getRoutes() : Promise<object[]>
    {
        const kernelRoutes = (new KernelRoutes(this._dependencyResolver))
            .extractor(this.swaggerExtractor);

        return kernelRoutes.endpoints();
    }

    async getMocks() : Promise<object[]>
    {
        const mockDependencyResolver = new DependencyMock(this.swaggerExtractor);

        const kernelRoutes = (new KernelRoutes(mockDependencyResolver))
            .extractor(this.swaggerExtractor)
            .prefix('/__mock');

        return kernelRoutes.endpoints();
    }

    async loadComponentDefinitions() : Promise<void>
    {
        const swaggerExtractor = new SwaggerExtractor();
        this.components = swaggerExtractor.getComponents();

        for (const componentName in this.components)
        {
            const uri = `/__component/definition/${componentName}`;
            this.app.get(uri, async function (req, res)
            {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(this.app.components[componentName]));
            });
        }
    }

    get(dependencyName: string) : any
    {
        return this._dependencyResolver.get(dependencyName);
    }

    listen() : void
    {
        const self = this;
        this.app.listen(this.app.get('port'), this.app.get('host'), function ()
        {
            fs.access(paths.db(), fs.constants.W_OK, function (err)
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

    quit() : void
    {
        console.log("Exiting cronos");
        process.exit();
    }
}
