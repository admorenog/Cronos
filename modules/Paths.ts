import path from 'path';

export default class Paths
{
    static root(): string
    {
        return path.dirname(require.main.filename);
    }
    static controllers(): string
    {
        return path.resolve(Paths.root(), "app/controllers");
    }
    static middlewares(): string
    {
        return path.resolve(Paths.root(), "app/middlewares");
    }
    static routes(): string
    {
        return path.resolve(Paths.root(), "routes");
    }
    static storage(): string
    {
        return path.resolve(Paths.root(), "storage");
    }
    static logs(): string
    {
        return path.resolve(Paths.storage(), "logs");
    }
    static db(): string
    {
        return path.resolve(Paths.storage(), "db");
    }
}
