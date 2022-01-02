import SmtpConfig from '$models/SmtpConfig';

export default class SmtpConfigController
{
    async index(request, response)
    {
        const smtpConfig = new SmtpConfig();
        const listOfSmtpConfigs = await smtpConfig.getAll();

        response.end(JSON.stringify(listOfSmtpConfigs));
    };

    async store(request, response)
    {
        const smtpConfig = SmtpConfig.parse(request.body);
        await smtpConfig.save();

        response.end(smtpConfig.toJson());
    };

    async update(request, response)
    {
        const smtpConfig = SmtpConfig.parse(request.body);
        smtpConfig._id = request.params.idSmtpConfig;
        smtpConfig.save();

        response.end(smtpConfig.toJson());
    };

    async delete(request, response)
    {
        const smtpConfig = new SmtpConfig(request.params.idSmtpConfig);
        smtpConfig.delete();

        response.end(smtpConfig.toJson());
    };
}
