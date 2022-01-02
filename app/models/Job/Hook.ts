import Output from "$models/Job/Output";
import Log from "$models/Log";
import { exec } from "child_process";

export default class Hook {
    private command: string;
    private output: Output;

    public async exec(): Promise<void> {
        const self = this;
        const fn = (new Promise<any>((resolve, reject) => {
            exec(self.command, (error, stdout, stderr) => {
                self.output = {error, stdout, stderr, code : 0};
                resolve(self.output);
            }).on("exit", (code) => self.output.code = code);
        }));

        await fn;

        this.saveLogs();

        // return await (new Promise<Output>((resolve, reject) =>
        // {
        // 	exec(self.command, (error, stdout, stderr) =>
        // 	{
        // 		self.output = {error, stdout, stderr, code : 0};
        // 		resolve(self.output);
        // 	}).on('exit', code => self.output.code = code);
        // }))();
    }

    private saveLogs() {
        const log = new Log(null, this);
        if (this.output.stdout) {
            log.saveOutput("[hook]" + this.output.stdout);
        }
        if (this.output.stderr) {
            log.saveError("[hook]" + this.output.stderr);
        }
    }
}
