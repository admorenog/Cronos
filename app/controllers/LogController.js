import Log from '$models/Log';
import Job from '$models/Job';

export default class LogController
{
    async list(request, response)
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

    async show(request, response)
    {
        let job = await (new Job(request.params.jobId)).get();

        let log = await (new Log(null, job)).getAll();

        response.end(JSON.stringify(log));
    }

    async delete(request, response)
    {
        // FIXME: change this to remove the current log.
        crontab.remove(request.body._id);
        response.end();
    };

    async get(request, response)
    {
        // TODO: return the selected log
        let _file = crontab.log_folder + "/" + req.query.id + ".log";

        if (fs.existsSync(_file))
            res.sendFile(_file);
        else
            res.end("No errors logged yet");
    };

    async getstdout(request, response)
    {
        // TODO: return the selected stdout
        let _file = crontab.log_folder + "/" + req.query.id + ".stdout.log";

        if (fs.existsSync(_file))
            res.sendFile(_file);
        else
            res.end("No errors logged yet");
    }
}
