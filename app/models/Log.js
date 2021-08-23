import path from 'path';
import fs from 'fs';
import paths from '$helpers/Paths';
import DbModel from '$helpers/DbModel';

export default class Log extends DbModel
{
    constructor(_id = null, job = null)
    {
        super();
        this._id = _id;
        if (job)
        {
            this.job = job;
            this.folder = paths.logs();
            this.logFileError = path.join(this.folder, this.job._id + ".err.log");
            this.logFileOut = path.join(this.folder, this.job._id + ".out.log");
            this.currentTime = (new Date).toLocaleString();
            this.logHeader = `[${this.currentTime}][exit:${this.job.output.exitCode}] `;
        }
    }

    saveOutput(output = null)
    {
        if (output || this.job.output.std.out)
        {
            let logRecord = this.logHeader + (output || this.job.output.std.out);
            fs.appendFileSync(this.logFileOut, logRecord);
        }
    }

    saveError(err = null)
    {
        if (err || this.job.output.std.err)
        {
            let logRecord = this.logHeader + (err || this.job.output.std.err);
            fs.appendFileSync(this.logFileError, logRecord);
        }
    }
}
