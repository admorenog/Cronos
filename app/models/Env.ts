import DbModel from '$core/Model/DbModel';

export default class Env extends DbModel
{
    _id: string;
    constructor(_id = null)
    {
        super();
        this._id = _id;
    }
}
