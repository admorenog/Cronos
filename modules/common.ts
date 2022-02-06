export default class Common
{
    static uuidv4()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
        {
            // tslint:disable-next-line
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static async wait(millis: number): Promise<void>
    {
        await (new Promise((res) => { setTimeout(res, millis); }));
    }

    static async waitDebugger(): Promise<void>
    {
        if (process.env.NODE_ENV === 'debug')
        {
            // tslint:disable-next-line:no-console
            console.debug("waiting the debugger");
            await Common.wait(2000);
        }
    }
}


