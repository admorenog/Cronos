import { ExecException } from "child_process";

export default class Output
{
	error: ExecException;
	stdout: string;
	stderr: string;
	code: number;
}
