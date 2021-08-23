import path from "path";
import Datastore from 'nedb';
import paths from '$helpers/paths';

export default class DbModel
{
    constructor()
    {
    }

    db()
    {
        if (!this._db)
        {
            let dbFile = path.join(paths.db(), this.constructor.name.toLowerCase() + '.db');
            this._db = new Datastore({ filename: dbFile });
            this._db.loadDatabase(function (err) { if (err) { throw err; } });
        }
        return this._db;
    }

    async save()
    {
        let self = this;
        self.updated_at = (new Date()).getTime();
        if (!self._id)
        {
            self.created_at = self.updated_at;
            delete self._id;
            let model = await (new Promise((resolve, reject) =>
            {
                self.db().insert(self.toStdObject(), (err, insertedDoc) =>
                {
                    if (err) { console.error(err); reject(err); }
                    resolve(insertedDoc);
                });
            }));
            self._id = model._id;
        }
        else
        {
            let stdObj = self.toStdObject();
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

    static parse(obj)
    {
        let model = new this(obj._id);
        for (let field in obj)
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

    async getAll()
    {
        let self = this;

        let models = await (new Promise((resolve, reject) =>
        {
            self.db().find({}).exec(function (err, documents)
            {
                if (err) { console.error(err); reject(err); }
                resolve(documents);
            });
        }));

        return models;
    }

    async get()
    {
        let self = this;
        let model = await (new Promise((resolve, reject) =>
        {
            self.db().find({ _id: self._id }).exec(function (err, documents)
            {
                if (err) { console.error(err); reject(err); }
                resolve(documents[0]);
            });
        }));

        return model;
    }

    async delete()
    {
        let self = this;
        let model = await (new Promise((resolve, reject) =>
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

        return model;
    }

    toStdObject()
    {
        let model = {};
        for (let field in this)
        {
            if (field != "_db")
            {
                model[field] = this[field];
            }
        }
        return model;
    }

    toJson()
    {
        return JSON.stringify(this.toStdObject());
    }
}
