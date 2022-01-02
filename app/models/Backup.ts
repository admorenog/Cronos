import fs from 'fs';
import paths from '$modules/Paths';

export default class Backup
{
    static dbPath: string = null;

    static init()
    {
        Backup.dbPath = paths.db();
    }

    static async getList()
    {
        const dbPath = Backup.init();
        const listOfBackups = [];
        fs.readdirSync(Backup.dbPath).forEach(function (file)
        {
            // file name begins with backup
            if (file.indexOf("backup") === 0)
            {
                listOfBackups.push({ name: file });
            }
        });

        // Sort by date. Newest on top
        for (let i = 0; i < listOfBackups.length; i++)
        {
            let Ti = listOfBackups[i].name.split("backup")[1];
            Ti = new Date(Ti.substring(0, Ti.length - 3)).valueOf();
            for (let j = 0; j < i; j++)
            {
                let Tj = listOfBackups[j].name.split("backup")[1];
                Tj = new Date(Tj.substring(0, Tj.length - 3)).valueOf();
                if (Ti > Tj)
                {
                    const temp = listOfBackups[i];
                    listOfBackups[i] = listOfBackups[j];
                    listOfBackups[j] = temp;
                }
            }
        }

        return listOfBackups;
    }
}
