import paths from '$modules/Paths';
import fs from 'fs';
import path from 'path';

import DependencyManager from '$core/Dependency/DependencyManager';

export default class DependencyResolver implements DependencyManager
{
	private _dependencies: any = {};

	async bootstrap() : Promise<void>
	{
		await this.loadMiddlewares();
		await this.loadControllers();
	}

    async loadMiddlewares() : Promise<void>
    {
		const middlewaresPath = paths.middlewares();
		await this.loadDependencies(middlewaresPath);
	}

    async loadControllers() : Promise<void>
    {
        const controllersPath = paths.controllers();
		await this.loadDependencies(controllersPath);
    }

	async loadDependencies(dependenciesPath: string) : Promise<void>
	{
        const dependencyFiles = fs.readdirSync(dependenciesPath, {withFileTypes: true});

        for (const idx in dependencyFiles)
        {
			if(dependencyFiles[idx].isFile()) {
				const dependencyFile = dependencyFiles[idx].name;
				await this.addFileAsDependency(dependenciesPath, dependencyFile)
			}
        }
	}

	private async addFileAsDependency(dependenciesPath: string, dependencyFile: string)
	{
		const name = dependencyFile.replace(".js", "");

		if (typeof this._dependencies[name] != typeof undefined)
		{
			throw new Error(`Triying to load the dependency ${name} twice.`);
		}

		const dependencyPath = path.join(dependenciesPath, name);
		const { default: dependency } = await import(dependencyPath);
		this._dependencies[name] = new dependency();
	}

	get(dependency: string) : any
	{
		const dependencyParts = dependency.split("@");
		const dependencyName = dependencyParts[0];
		const dependencyClass = this._dependencies[dependencyName];
		if (dependencyParts.length > 1)
		{
			const fnName = dependencyParts[1];
			return dependencyClass[fnName];
		}
		return dependencyClass;
	}
}
