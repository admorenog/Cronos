export default class MockExtractorAdapter
{

    constructor(swaggerExtractor)
    {
        this.swaggerExtractor = swaggerExtractor;
    }

    getRoutes()
    {
        return this.swaggerExtractor.getRoutes();
    }
}
