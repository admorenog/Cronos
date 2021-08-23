import DbModel from '$helpers/DbModel';

export default class SmtpConfig extends DbModel
{
    constructor(_id = null)
    {
        super();
        if (_id) { this._id = _id; }
        this.name = null;
        this.host = null;
        this.port = null;
        this.secure = null;
        this.auth = { user: null, password: null };
    }
}
