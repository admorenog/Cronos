import os from "os";
import fs from "fs";
import { exec } from 'child_process';

import DbModel from '$core/Model/DbModel';
import Log from '$models/Log';
import Mail from '$models/Mail';

export default class Job extends DbModel
{
    constructor(_id = null)
    {
        super();
        this._id = _id;
        this.name = null;
        this.command = null;
        this.hooks = null;
        this.logging = null;
        this.mailing = null;
        this.saved = null;
        this.schedule = null;
        this.timestamp = null;
        this.cronos_id = null;
        this.output = {};
    }

    async exec()
    {
        return await (new Promise((resolve, reject) =>
        {
            exec(this.command, (error, stdout, stderr) =>
            {
                let output = { isError: error, out: stdout, err: stderr };
                this.output.std = output;
                resolve(output);
            }).on('exit', code => this.output.exitCode = code);
        }));
    }

    saveLogs()
    {
        if (this.logging && this.logging == "true")
        {
            let log = new Log(null, this);
            log.saveOutput();
            log.saveError();
        }
    }

    sendMail()
    {
        if (typeof (this.mailing.mailOptions) != typeof (undefined)
            && typeof (this.mailing.transporter) != typeof (undefined))
        {
            let hostname = os.hostname();
            let job = this;
            let context = { hostname, job };

            let tmpOutFile = `/tmp/${job._id}_${(new Date).getMilliseconds()}.out.log`;
            let tmpErrFile = `/tmp/${job._id}_${(new Date).getMilliseconds()}.err.log`;
            this.mailing.mailOptions.attachments = [];
            if (this.mailing.mailOptions.attach_output && this.output.std.out)
            {
                fs.writeFileSync(tmpOutFile, this.output.std.out);
                let attachment = { filename: "stdout.log", path: tmpOutFile };
                this.mailing.mailOptions.attachments.push(attachment);
            }
            if (this.mailing.mailOptions.attach_error && this.output.std.err)
            {
                fs.writeFileSync(tmpErrFile, this.output.std.err);
                let attachment = { filename: "stderr.log", path: tmpErrFile };
                this.mailing.mailOptions.attachments.push(attachment);
            }

            let mail = new Mail(this.mailing);
            let self = this;

            mail.sendMail(context, function (error, info)
            {
                let log = new Log(null, self);
                if (error) { return log.saveError(JSON.stringify(error) + "\n"); }
                log.saveOutput('Message sent: ' + info.response);
                fs.unlinkSync(tmpOutFile);
                fs.unlinkSync(tmpErrFile);
            });
        }
    }

    async sendHooks()
    {
        for (let idxHook in this.hooks)
        {
            let hook = hooks[idxHook];
            hook.output = {};
            await (new Promise((resolve, reject) =>
            {
                exec(hook, (error, stdout, stderr) =>
                {
                    let output = { isError: error, out: stdout, err: stderr };
                    hook.output.std = output;
                    resolve(output);
                }).on('exit', code => hook.output.exitCode = code);
            }))();

            let log = new Log(null, this);
            if (hook.output.std.out)
            {
                log.saveOutput("[hook]" + hook.output.std.out);
            }
            if (hook.output.std.err)
            {
                log.saveError("[hook]" + hook.output.std.err);
            }
        }
    }
}
