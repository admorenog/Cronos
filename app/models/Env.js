import DbModel from '$helpers/DbModel';

export default class Env extends DbModel
{
    constructor(_id = null)
    {
        super();
        this._id = _id;
    }
}
