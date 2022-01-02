import path from "path";
import Datastore from 'nedb';
import paths from '$modules/Paths';

export default class DbModel
{
    _db: Datastore = null;
    _id: string = null;
    created_at: number = null;
    updated_at: number = null;

    constructor(_id? : string)
    {

    }

    db() : Datastore
    {
        if (!this._db)
        {
            const dbFile = path.join(paths.db(), this.constructor.name.toLowerCase() + '.db');
            this._db = new Datastore({ filename: dbFile });
            this._db.loadDatabase(function (err) { if (err) { throw err; } });
        }
        return this._db;
    }

    async save() : Promise<DbModel>
    {
        const self = this;
        self.updated_at = (new Date()).getTime();
        if (!self._id)
        {
            self.created_at = self.updated_at;
            delete self._id;
            const model: DbModel = await (new Promise((resolve, reject) =>
            {
                self.db().insert(self.toStdObject(), (err, insertedDoc) =>
                {
                    if (err) { console.error(err); reject(err); }
                    const model = DbModel.parse(insertedDoc);
                    resolve(model);
                });
            }));
            self._id = model._id;
        }
        else
        {
            const stdObj : any = self.toStdObject();
            await (new Promise((resolve, reject) =>
            {
                self.db().update({ _id: stdObj._id }, stdObj, {}, (err, numberOfUpdated, upsert) =>
                {
                    if (err) { console.error(err); reject(err); }
                    resolve(stdObj);
                });
            }));
        }
        return self;
    }

    static parse(obj: any) : DbModel
    {
        const model = new this(obj._id);
        for (const field in obj)
        {
            if (field == "updated_at")
            {
                model[field] = (new Date(obj[field])).getTime();
            }
            else if (field != "timestamp")
            {
                model[field] = obj[field];
            }
        }
        return model;
    }

    async getAll() : Promise<this[]>
    {
        const self = this;

        const models : this[] = await (new Promise((resolve, reject) =>
        {
            self.db().find({}).exec(function (err, documents)
            {
                if (err) { console.error(err); reject(err); }
                resolve(documents);
            });
        }));

        return models;
    }

    async get() : Promise<this>
    {
        const self = this;
        const model : this = await (new Promise((resolve, reject) =>
        {
            self.db().find({ _id: self._id }).exec(function (err, documents)
            {
                if (err) { console.error(err); reject(err); }
                resolve(documents[0]);
            });
        }));

        return model;
    }

    async delete() : Promise<number>
    {
        const self = this;
        const numRemoved : number = await (new Promise((resolve, reject) =>
        {
            self.db().remove({ _id: self._id }, (err, n) =>
            {
                if (!err)
                {
                    resolve(n);
                }
                else
                {
                    reject(err);
                }
            });
        }));

        return numRemoved;
    }

    toStdObject() : object
    {
        const model : any = {};
        for (const field in this)
        {
            if (field != "_db")
            {
                model[field] = this[field];
            }
        }
        return model;
    }

    toJson() : string
    {
        return JSON.stringify(this.toStdObject());
    }
}