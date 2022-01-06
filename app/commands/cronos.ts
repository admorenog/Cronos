#!node_modules/.bin/babel-node
// --inspect - brk=0.0.0.0: 9230
import Job from '$app/models/Job';

/**
 * argv = [
 * 0 => "process name"
 * 1 => _id
 * ]
 */
void async function main(argv)
{
    if (argv.length < 2)
    {
        throw new Error(`Insufficient Arguments: ${argv.length}, 2 needed.`);
    }

    const _id = argv[1];
    const job = await (new Job(_id)).get();

    await job.exec();
    job.saveLogs();
    job.sendMail();
    job.sendHooks();
}(process.argv);
