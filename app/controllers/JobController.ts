import Job from '$app/models/Job';

export default class JobController
{
    async list(request, response)
    {
        const job = new Job();
        const listOfJobs = await job.getAll();

        response.end(JSON.stringify(listOfJobs));
    }

    async store(request, response)
    {
        const job = Job.parse(request.body);
        job.save();

        response.end(job.toJson());
    }

    async show(request, response)
    {
        const job = await (new Job(request.body._id)).get();

        response.end(JSON.stringify(job));
    }

    async update(request, response)
    {
        const job = Job.parse(request.body);
        job.save();

        response.end(job.toJson());
    }

    async delete(request, response)
    {
        // FIXME: change this to remove the current job.
        // crontab.remove(request.body._id);
        response.end();
    };

    async run(request, response)
    {
        // FIXME: change this to run the current job.
        // crontab.runjob(request.body._id);
        response.end();
    };

    async enable(request, response)
    {
        // FIXME: enable the job
        // crontab.status(request.body._id, false);
        response.end();
    };

    async disable(request, response)
    {
        // FIXME: stop the job
        // crontab.status(request.body._id, true);
        response.end();
    };
}
