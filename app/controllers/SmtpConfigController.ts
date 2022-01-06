import * as core from 'express-serve-static-core';
import SmtpConfig from '$models/SmtpConfig';

export default class SmtpConfigController
{
    async index(request: core.Request, response: core.Response)
    {
        const smtpConfig = new SmtpConfig();
        const listOfSmtpConfigs = await smtpConfig.getAll();

        response.end(JSON.stringify(listOfSmtpConfigs));
    };

    async store(request: core.Request, response: core.Response)
    {
        const smtpConfig = SmtpConfig.parse(request.body);
        await smtpConfig.save();

        response.end(smtpConfig.toJson());
    };

    async update(request: core.Request, response: core.Response)
    {
        const smtpConfig = SmtpConfig.parse(request.body);
        smtpConfig._id = request.params.idSmtpConfig;
        smtpConfig.save();

        response.end(smtpConfig.toJson());
    };

    async delete(request: core.Request, response: core.Response)
    {
        const smtpConfig = new SmtpConfig(request.params.idSmtpConfig);
        smtpConfig.delete();

        response.end(smtpConfig.toJson());
    };
}
