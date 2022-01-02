import fs from 'fs';
import paths from '$modules/Paths';

import DependencyResolver from '$core/Dependency/DependencyResolver';
import DependencyManager from '$core/Dependency/DependencyManager';
import SwaggerExtractor from '$core/Swagger/Extractor';

export default class DependencyMock extends DependencyResolver implements DependencyManager
{
	_swaggerExtractor: SwaggerExtractor;
	constructor(swaggerExtractor: SwaggerExtractor)
	{
		super();
		this._swaggerExtractor = swaggerExtractor;
	}

    async loadControllers() : Promise<void>
    {
        const controllersPath = paths.controllers();
		await this.loadMockDependencies(controllersPath);
	}

	async loadMockDependencies(dependenciesPath: string)
	{
        const dependencyFiles = fs.readdirSync(dependenciesPath);

        for (const idx in dependencyFiles)
        {
			const dependencyFile = dependencyFiles[idx];
			await this.addMockAsDependency(dependenciesPath, dependencyFile);
        }
	}

	private async addMockAsDependency(dependenciesPath: string, dependencyFile: string)
	{
		// TODO: get first response from swagger for each path.
	}
}
