import App from './app/App';

void async function main()
{
    let app = new App();

    await app.setConfig();

    await app.setBasicAuth();

    await app.loadPlugins();

    await app.loadMiddlewares();

    await app.loadControllers();

    await app.loadRoutes();

    await app.loadComponentDefinitions();

    app.listen();
}();
