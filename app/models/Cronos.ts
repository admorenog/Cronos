import DbModel from '$core/Model/DbModel';
import path from 'path';
import fs from 'fs';

export default class Cronos extends DbModel
{
    envId: string = null;

    import()
    {
        // FIXME: change the way we are storing the data.
        // exec("crontab -l", function (error, stdout, stderr)
        // {
        //     var lines = stdout.split("\n");
        //     var namePrefix = new Date().getTime();

        //     lines.forEach(function (line, index)
        //     {
        //         line = line.replace(/\t+/g, ' ');
        //         var regex = /^((\@[a-zA-Z]+\s+)|(([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+))/;
        //         var command = line.replace(regex, '').trim();
        //         var schedule = line.replace(command, '').trim();

        //         var is_valid = false;
        //         try { is_valid = cron_parser.parseString(line).expressions.length > 0; } catch (e) { }

        //         if (command && schedule && is_valid)
        //         {
        //             var name = namePrefix + '_' + index;

        //             db.findOne({ command: command, schedule: schedule }, function (err, doc)
        //             {
        //                 if (err)
        //                 {
        //                     throw err;
        //                 }
        //                 if (!doc)
        //                 {
        //                     let job = { name, command, schedule }
        //                     exports.create_new(job);
        //                 }
        //                 else
        //                 {
        //                     doc.command = command;
        //                     doc.schedule = schedule;
        //                     exports.update(doc);
        //                 }
        //             });
        //         }
        //     });
        // });
    };

    override(envVars, callback)
    {
        exports.crontabs((tabs) =>
        {
            let crontabString = "";
            if (envVars)
            {
                crontabString = envVars + "\n";
            }
            tabs.forEach(function (tab)
            {
                if (!tab.stopped)
                {
                    const stderr = path.join(this.cronPath, tab._id + ".stderr");
                    const stdout = path.join(this.cronPath, tab._id + ".stdout");
                    const logFile = path.join(exports.log_folder, tab._id + ".log");
                    const logFileStdout = path.join(exports.log_folder, tab._id + ".stdout.log");

                    if (tab.command[tab.command.length - 1] !== ";") // add semicolon
                        tab.command += ";";

                    crontabString += tab.schedule + " ({ " + tab.command + " } | tee " + stdout + ") 3>&1 1>&2 2>&3 | tee " + stderr;

                    if (tab.logging && tab.logging === "true")
                    {
                        crontabString += "; if test -f " + stderr +
                            "; then date >> \"" + logFile + "\"" +
                            "; cat " + stderr + " >> \"" + logFile + "\"" +
                            "; fi";

                        crontabString += "; if test -f " + stdout +
                            "; then date >> \"" + logFileStdout + "\"" +
                            "; cat " + stdout + " >> \"" + logFileStdout + "\"" +
                            "; fi";
                    }

                    if (tab.hooks)
                    {
                        for (const idxHook of Object.keys(tab.hooks))
                        {
                            const hook = tab.hooks[idxHook];
                            hook.command = hook.command || "tee";
                            crontabString += "; if test -f " + stdout +
                                "; then " + hook.command + " < " + stdout +
                                "; fi";
                        }
                    }

                    if (tab.mailing && JSON.stringify(tab.mailing) !== "{}")
                    {
                        crontabString += "; /usr/local/bin/node " + __dirname + "/bin/crontab-ui-mailer.js " + tab._id + " " + stdout + " " + stderr;
                    }

                    crontabString += "\n";
                }
            });

            fs.writeFile(exports.env_file, envVars, function (err)
            {
                if (err)
                {
                    callback(err);
                }
                // In docker we're running as the root user, so we need to write the file as root and not crontab
                const fileName = process.env.CRON_IN_DOCKER !== undefined ? "root" : "crontab";
                fs.writeFile(path.join(this.cronPath, fileName), crontabString, () =>
                {
                    // exec("crontab " + path.join(this.cronPath, fileName), function (err)
                    // {
                    //     if (err)
                    //     {
                    //         console.error(err);
                    //         return callback(err);
                    //     }
                    //     else
                    //     {
                    //         db.update({}, { $set: { saved: true } }, { multi: true });
                    //         callback();
                    //     }
                    // });
                });
            });
        });
    };
}
