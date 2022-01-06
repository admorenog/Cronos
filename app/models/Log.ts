import path from 'path';
import fs from 'fs';
import paths from '$modules/Paths';
import DbModel from '$core/Model/DbModel';
import Job from '$app/models/Job';

export default class Log extends DbModel
{
    _id: string = null;
    job: Job = null;
    folder: string = null;
    logFileError: string  = null;
    logFileOut: string  = null;
    currentTime: string  = null;
    logHeader: string = null;

    constructor(_id = null, job = null)
    {
        super(_id);
        if (job)
        {
            this.job = job;
            this.folder = paths.logs();
            this.logFileError = path.join(this.folder, this.job._id + ".err.log");
            this.logFileOut = path.join(this.folder, this.job._id + ".out.log");
            this.currentTime = (new Date()).toLocaleString();
            this.logHeader = `[${this.currentTime}][exit:${this.job.output.exitCode}] `;
        }
    }

    saveOutput(output = null)
    {
        if (output || this.job.output.std.out)
        {
            const logRecord = this.logHeader + (output || this.job.output.std.out);
            fs.appendFileSync(this.logFileOut, logRecord);
        }
    }

    saveError(err = null)
    {
        if (err || this.job.output.std.err)
        {
            const logRecord = this.logHeader + (err || this.job.output.std.err);
            fs.appendFileSync(this.logFileError, logRecord);
        }
    }
}
