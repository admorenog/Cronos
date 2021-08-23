import path from 'path';

export default class Paths
{
    static root()
    {
        return path.dirname(require.main.filename);
    }
    static storage()
    {
        return path.resolve(Paths.root(), "storage");
    }
    static controllers()
    {
        return path.resolve(Paths.root(), "app/controllers");
    }
    static middlewares()
    {
        return path.resolve(Paths.root(), "app/middlewares");
    }
    static logs()
    {
        return path.resolve(Paths.storage(), "logs");
    }
    static db()
    {
        return path.resolve(Paths.storage(), "db");
    }
}
