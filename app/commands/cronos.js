#!/usr/bin/env node --inspect-brk=0.0.0.0:9230
import Job from '$models/Job';

void async function main(argv)
{
    if (argv.length < 3)
    {
        return console.error(`Insufficient Arguments: ${process.argv.length}, 4 needed`);
    }

    let _id = argv[2];
    let job = await (new Job(_id)).get();

    await job.exec();
    job.saveLogs();
    job.sendMail();
    job.sendHooks();
}(process.argv);
