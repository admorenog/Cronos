import * as core from 'express-serve-static-core';
import Job from '$app/models/Job';

export default class JobController
{
    async list(request: core.Request, response: core.Response)
    {
        const jobs = await (new Job()).getAll();

        response.end(JSON.stringify(jobs));
    }

    async store(request: core.Request, response: core.Response)
    {
        const job = Job.parse(request.body);
        job.save();

        response.end(job.toJson());
    }

    async show(request: core.Request, response: core.Response)
    {
        const job = await (new Job(request.body._id)).get();

        response.end(JSON.stringify(job));
    }

    async update(request: core.Request, response: core.Response)
    {
        const job = Job.parse(request.body);
        job.save();

        response.end(job.toJson());
    }

    async delete(request: core.Request, response: core.Response)
    {
        // FIXME: change this to remove the current job.
        // crontab.remove(request.body._id);
        response.end();
    };

    async run(request: core.Request, response: core.Response)
    {
        // FIXME: change this to run the current job.
        // crontab.runjob(request.body._id);
        response.end();
    };

    async enable(request: core.Request, response: core.Response)
    {
        // FIXME: enable the job
        // crontab.status(request.body._id, false);
        response.end();
    };

    async disable(request: core.Request, response: core.Response)
    {
        // FIXME: stop the job
        // crontab.status(request.body._id, true);
        response.end();
    };
}
