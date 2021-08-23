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
        let listOfBackups = await Backup.getList();
        response.end(JSON.stringify(listOfBackups));
    };

    async set(request, response)
    {
        // FIXME: set new crontab
        crontab.set_crontab(req.query.env_vars, function (err)
        {
            if (err) next(err);
            else res.end();
        });
    };

    async delete(request, response)
    {
        // FIXME: delete the selected cronos
        response.setHeader('Content-Type', 'application/json');
        let listOfBackups = await Backup.getList();
        response.end(JSON.stringify(listOfBackups));
    };

    async enable(request, response)
    {
        // FIXME: enable the selected cronos
        crontab.restore(req.query.db);
        res.end();
    };

    async import(request, response)
    {
        // FIXME: import from crontab
        crontab.import_crontab();
        res.end();
    };
}
