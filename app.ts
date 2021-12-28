import App from '$app/App';
import helpers from '$helpers/common';

void async function main()
{
    if (process.env.NODE_ENV == 'debug')
    {
        console.log("waiting the debugger");
        await helpers.wait(2000);
    }

    let app = new App();

    app.bootstrap();

    app.listen();
}();
