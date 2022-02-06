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

import Exception from '$core/Exceptions/Exception';
import SwaggerRoutes from '$core/Routes/Swagger';
import SwaggerExtractor from '$core/Swagger/Extractor';
import KernelRoutes from '$core/Routes/Kernel';
import DependencyResolver from '$core/Dependency/DependencyResolver';
import DependencyMock from '$core/Dependency/DependencyMock';

export default class App
{
    private static _instance : App = null;
    private app: core.Express;
    private _dependencyResolver: DependencyResolver;
    private components: object;

    private constructor()
    {
        this.app = express();

        this._dependencyResolver = new DependencyResolver();
    }

    public static instance() : App
    {
        if(App._instance == null) {
            App._instance = new App();
        }

        return App._instance;
    }

    async bootstrap() : Promise<void>
    {
        this.setConfig();

        this.setExceptionHandler();

        this.setBasicAuth();

        this.loadPlugins();

        await this._dependencyResolver.bootstrap();

        this.loadComponentDefinitions();

        this.loadRoutes();
    }

    setConfig() : void
    {
        express.static.mime.define({ 'application/javascript': ['vue'] });

        this.app.set('host', (process.env.HOST || '127.0.0.1'));
        this.app.set('port', (process.env.PORT || 8000));

        process.on('SIGINT', this.quit);
        process.on('SIGTERM', this.quit);
    }

    setExceptionHandler() {
        // TODO: check if exists a custom exception handler in app folder.
        this.app.use(Exception.handler);
    }

    setBasicAuth() : void
    {
        const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
        const BASIC_AUTH_PWD = process.env.BASIC_AUTH_PWD;

        if (BASIC_AUTH_USER && BASIC_AUTH_PWD)
        {
            this.app.use((req, res, next) =>
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

    loadPlugins() : void
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
        const routes = this.getRoutes();
        this.registerRoutes(routes);

        // const mocks = await this.getMocks();
        // this.registerRoutes(mocks);
    }

    async registerRoutes(routes: any[])
    {
        for (const idxRoute of Object.keys(routes))
        {
            const route = routes[idxRoute];

            this.app[route.method](route.path, ...route.middlewares, route.controller);
        }
    }

    getRoutes() : object[]
    {
        const swaggerRoutes = new SwaggerRoutes(paths.routes());
        const kernelRoutes = (new KernelRoutes(swaggerRoutes))
            .dependencyManager(this._dependencyResolver);

        return kernelRoutes.endpoints();
    }

    async getMocks() : Promise<object[]>
    {
        const swaggerRoutes = new SwaggerRoutes(paths.routes());
        const swaggerExtractor = new SwaggerExtractor();
        const mockDependencyResolver = new DependencyMock(swaggerExtractor);

        const kernelRoutes = (new KernelRoutes(swaggerRoutes))
            .prefix('/__mock')
            .dependencyManager(mockDependencyResolver);

        return kernelRoutes.endpoints();
    }

    loadComponentDefinitions() : void
    {
        const swaggerExtractor = new SwaggerExtractor();
        this.components = swaggerExtractor.getComponents();

        for (const componentName of Object.keys(this.components))
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
        this.checkPermissionsInStorage();
        const self = this;
        this.app.listen(this.app.get('port'), this.app.get('host'), () =>
        {
            // tslint:disable-next-line:no-console
            console.log("Cronos is running at http://" + self.app.get('host') + ":" + self.app.get('port'));
        });
    }

    checkPermissionsInStorage() : void
    {
        fs.access(paths.db(), fs.constants.W_OK, (err) =>
        {
            if (err)
            {
                throw new Error("Write access to " + paths.db() + " DENIED.");
            }
        });
    }

    quit() : void
    {
        // tslint:disable-next-line:no-console
        console.log("Exiting cronos");
        process.exit();
    }
}
