import DbModel from '$core/Model/DbModel';

export default class Cronos extends DbModel
{
    constructor(id = null)
    {
        this.id = id;
        this.env_id = null;
        super();
    }

    import()
    {
        // FIXME: change the way we are storing the data.
        exec("crontab -l", function (error, stdout, stderr)
        {
            var lines = stdout.split("\n");
            var namePrefix = new Date().getTime();

            lines.forEach(function (line, index)
            {
                line = line.replace(/\t+/g, ' ');
                var regex = /^((\@[a-zA-Z]+\s+)|(([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+))/;
                var command = line.replace(regex, '').trim();
                var schedule = line.replace(command, '').trim();

                var is_valid = false;
                try { is_valid = cron_parser.parseString(line).expressions.length > 0; } catch (e) { }

                if (command && schedule && is_valid)
                {
                    var name = namePrefix + '_' + index;

                    db.findOne({ command: command, schedule: schedule }, function (err, doc)
                    {
                        if (err)
                        {
                            throw err;
                        }
                        if (!doc)
                        {
                            let job = { name, command, schedule }
                            exports.create_new(job);
                        }
                        else
                        {
                            doc.command = command;
                            doc.schedule = schedule;
                            exports.update(doc);
                        }
                    });
                }
            });
        });
    };

    override(env_vars, callback)
    {
        exports.crontabs(function (tabs)
        {
            var crontab_string = "";
            if (env_vars)
            {
                crontab_string = env_vars + "\n";
            }
            tabs.forEach(function (tab)
            {
                if (!tab.stopped)
                {
                    let stderr = path.join(cronPath, tab._id + ".stderr");
                    let stdout = path.join(cronPath, tab._id + ".stdout");
                    let log_file = path.join(exports.log_folder, tab._id + ".log");
                    let log_file_stdout = path.join(exports.log_folder, tab._id + ".stdout.log");

                    if (tab.command[tab.command.length - 1] != ";") // add semicolon
                        tab.command += ";";

                    crontab_string += tab.schedule + " ({ " + tab.command + " } | tee " + stdout + ") 3>&1 1>&2 2>&3 | tee " + stderr;

                    if (tab.logging && tab.logging == "true")
                    {
                        crontab_string += "; if test -f " + stderr +
                            "; then date >> \"" + log_file + "\"" +
                            "; cat " + stderr + " >> \"" + log_file + "\"" +
                            "; fi";

                        crontab_string += "; if test -f " + stdout +
                            "; then date >> \"" + log_file_stdout + "\"" +
                            "; cat " + stdout + " >> \"" + log_file_stdout + "\"" +
                            "; fi";
                    }

                    if (tab.hooks)
                    {
                        for (let idxHook in tab.hooks)
                        {
                            let hook = tab.hooks[idxHook];
                            hook.command = hook.command || "tee";
                            crontab_string += "; if test -f " + stdout +
                                "; then " + hook.command + " < " + stdout +
                                "; fi";
                        }
                    }

                    if (tab.mailing && JSON.stringify(tab.mailing) != "{}")
                    {
                        crontab_string += "; /usr/local/bin/node " + __dirname + "/bin/crontab-ui-mailer.js " + tab._id + " " + stdout + " " + stderr;
                    }

                    crontab_string += "\n";
                }
            });

            fs.writeFile(exports.env_file, env_vars, function (err)
            {
                if (err)
                {
                    console.error(err);
                    callback(err);
                }
                // In docker we're running as the root user, so we need to write the file as root and not crontab
                var fileName = process.env.CRON_IN_DOCKER !== undefined ? "root" : "crontab";
                fs.writeFile(path.join(cronPath, fileName), crontab_string, function (err)
                {
                    if (err)
                    {
                        console.error(err);
                        return callback(err);
                    }

                    exec("crontab " + path.join(cronPath, fileName), function (err)
                    {
                        if (err)
                        {
                            console.error(err);
                            return callback(err);
                        }
                        else
                        {
                            db.update({}, { $set: { saved: true } }, { multi: true });
                            callback();
                        }
                    });
                });
            });
        });
    };
}
