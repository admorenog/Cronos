import DbModel from '$core/Model/DbModel';

export default class SmtpConfig extends DbModel
{
    _id: string = null;
    name: string = null;
    host: string = null;
    port: string = null;
    secure: string = null;
    auth: object = { user: null, password: null };

    constructor(_id = null)
    {
        super();
        if (_id) { this._id = _id; }
    }
}
