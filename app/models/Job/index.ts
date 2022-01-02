import os from "os";
import fs from "fs";
import { exec } from 'child_process';

import DbModel from '$core/Model/DbModel';
import Log from '$models/Log';
import Mail from '$models/Mail';
import Hook from '$models/Job/Hook';

export default class Job extends DbModel
{
    name : string;
    command : string;
    hooks : Hook[];
    logging : string;
    mailing : Mail;
    saved : string;
    schedule : string;
    timestamp : string;
    cronos_id : string;
    output: any = {std: "", exitCode: 0 };

    constructor(_id = null)
    {
        super();
        this._id = _id;
    }

    async exec()
    {
        return await (new Promise((resolve, reject) =>
        {
            exec(this.command, (error, stdout, stderr) =>
            {
                const output = { isError: error, out: stdout, err: stderr };
                this.output.std = output;
                resolve(output);
            }).on('exit', code => this.output.exitCode = code);
        }));
    }

    saveLogs()
    {
        if (this.logging && this.logging == "true")
        {
            const log = new Log(null, this);
            log.saveOutput();
            log.saveError();
        }
    }

    sendMail()
    {
        if (typeof (this.mailing.mailOptions) != typeof (undefined)
            && typeof (this.mailing.transporter) != typeof (undefined))
        {
            const hostname = os.hostname();
            const job = this;
            const context = { hostname, job };

            const tmpOutFile = `/tmp/${job._id}_${(new Date).getMilliseconds()}.out.log`;
            const tmpErrFile = `/tmp/${job._id}_${(new Date).getMilliseconds()}.err.log`;
            this.mailing.mailOptions.attachments = [];
            if (this.mailing.attach_output && this.output.std.out)
            {
                fs.writeFileSync(tmpOutFile, this.output.std.out);
                const attachment = { filename: "stdout.log", path: tmpOutFile };
                this.mailing.mailOptions.attachments.push(attachment);
            }
            if (this.mailing.attach_error && this.output.std.err)
            {
                fs.writeFileSync(tmpErrFile, this.output.std.err);
                const attachment = { filename: "stderr.log", path: tmpErrFile };
                this.mailing.mailOptions.attachments.push(attachment);
            }

            const mail = new Mail(this.mailing);
            const self = this;

            mail.sendMail(context, function (error, info)
            {
                const log = new Log(null, self);
                if (error) { return log.saveError(JSON.stringify(error) + "\n"); }
                log.saveOutput('Message sent: ' + info.response);
                fs.unlinkSync(tmpOutFile);
                fs.unlinkSync(tmpErrFile);
            });
        }
    }

    async sendHooks()
    {
        for (const idxHook in this.hooks)
        {
            const hook = this.hooks[idxHook];

            await hook.exec();
        }
    }
}
