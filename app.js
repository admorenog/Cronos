import App from './app/App';

void async function main()
{
    let app = new App();

    await app.setConfig();

    await app.setBasicAuth();

    await app.loadPlugins();

    await app.loadMiddlewares();

    await app.loadControllers();

    await app.loadComponentDefinitions();

    await app.loadRoutes();

    await app.loadMocks();

    app.listen();
}();
