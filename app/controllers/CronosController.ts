import * as core from 'express-serve-static-core';
import Backup from '$models/Backup';

export default class CronosController
{
    async index(request: core.Request, response: core.Response)
    {
        response.render('index');
    }

    async backups(request: core.Request, response: core.Response)
    {
        // FIXME: show a list of non active cronos
        response.setHeader('Content-Type', 'application/json');
        const listOfBackups = await Backup.getList();
        response.end(JSON.stringify(listOfBackups));
    };

    async set(request: core.Request, response: core.Response)
    {
        // FIXME: set new crontab
        // crontab.set_crontab(request.query.env_vars, function (err)
        // {
        //     if (err) next(err);
        //     else response.end();
        // });
    };

    async delete(request: core.Request, response: core.Response)
    {
        // FIXME: delete the selected cronos
        response.setHeader('Content-Type', 'application/json');
        const listOfBackups = await Backup.getList();
        response.end(JSON.stringify(listOfBackups));
    };

    async enable(request: core.Request, response: core.Response)
    {
        // FIXME: enable the selected cronos
        // crontab.restore(request.query.db);
        response.end();
    };

    async import(request: core.Request, response: core.Response)
    {
        // FIXME: import from crontab
        // crontab.import_crontab();
        response.end();
    };
}
