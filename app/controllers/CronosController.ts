import Backup from '$models/Backup';

export default class CronosController
{
    async index(request, response)
    {
        response.render('index');
    }

    async backups(request, response)
    {
        // FIXME: show a list of non active cronos
        response.setHeader('Content-Type', 'application/json');
        const listOfBackups = await Backup.getList();
        response.end(JSON.stringify(listOfBackups));
    };

    async set(request, response)
    {
        // FIXME: set new crontab
        // crontab.set_crontab(request.query.env_vars, function (err)
        // {
        //     if (err) next(err);
        //     else response.end();
        // });
    };

    async delete(request, response)
    {
        // FIXME: delete the selected cronos
        response.setHeader('Content-Type', 'application/json');
        const listOfBackups = await Backup.getList();
        response.end(JSON.stringify(listOfBackups));
    };

    async enable(request, response)
    {
        // FIXME: enable the selected cronos
        // crontab.restore(request.query.db);
        response.end();
    };

    async import(request, response)
    {
        // FIXME: import from crontab
        // crontab.import_crontab();
        response.end();
    };
}
