import * as core from 'express-serve-static-core';
import Log from '$models/Log';
import Job from '$app/models/Job';
import fs from 'fs';

export default class LogController
{
    async list(request: core.Request, response: core.Response)
    {
        let listOfLogs = [];
        let job = null;

        if (request.params.jobId)
        {
            job = await (new Job(request.params.jobId)).get();
        }

        listOfLogs = await (new Log(null, job)).getAll();

        response.end(JSON.stringify(listOfLogs));
    }

    async show(request: core.Request, response: core.Response)
    {
        const job = await (new Job(request.params.jobId)).get();

        const log = await (new Log(null, job)).getAll();

        response.end(JSON.stringify(log));
    }

    async delete(request: core.Request, response: core.Response)
    {
        // FIXME: change this to remove the current log.
        // crontab.remove(request.body._id);
        response.end();
    };

    async get(request: core.Request, response: core.Response)
    {
        // TODO: return the selected log
        // let _file = crontab.log_folder + "/" + request.query.id + ".log";

        // if (fs.existsSync(_file))
        //     response.sendFile(_file);
        // else
        //     response.end("No errors logged yet");
    };

    async getstdout(request: core.Request, response: core.Response)
    {
        // TODO: return the selected stdout
        // let _file = crontab.log_folder + "/" + request.query.id + ".stdout.log";

        // if (fs.existsSync(_file))
        //     response.sendFile(_file);
        // else
        //     response.end("No errors logged yet");
    }
}
