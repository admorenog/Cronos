import App from '$app/App';
import Common from '$modules/common';

void async function main()
{
    // await Common.waitDebugger();

    const app = App.instance();

    await app.bootstrap();

    return app.listen();
}();
