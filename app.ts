import App from '$app/App';
import helpers from '$modules/common';

void async function main()
{
    if (process.env.NODE_ENV == 'debug')
    {
        console.log("waiting the debugger");
        await helpers.wait(2000);
    }

    const app = new App();

    await app.bootstrap();

    return app.listen();
}();
