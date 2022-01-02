export class Swagger
{
	paths: Path[];
	components: { schemas: {} };
	getRoutes()
	{

	}
}

export class Path
{
	path: string;
	methods: Method[];
}

export class Method
{
	verb: string;
	constructor(verb: string, route: string, middlewares: string[], controller: string)
	{

	}
}
