import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

export default class Mail
{
    constructor(options)
    {
        this.mailOptions = options.mailOptions;
        this.transporter = nodemailer.createTransport(options.transporter);
        this.templatesPath = path.join(__dirname, "/../config/templates/");
        if (!fs.existsSync(this.templatesPath))
        {
            return console.error(`the templates path folder doesn't exists, check: ${this.templatesPath}`);
        }

    }

    sendMail(ctx, cb)
    {
        this.mailOptions = this.parseFields(ctx);
        return this.transporter.sendMail(this.mailOptions, cb);
    }

    getHtmlTemplate()
    {
        let templateFile = path.join(this.templatesPath, this.mailOptions.template);
        let htmlTemplate = fs.readFileSync(templateFile).toString();
        return htmlTemplate || this.mailOptions.html;
    }

    parseFields(ctx)
    {
        this.mailOptions.html = this.getHtmlTemplate();
        for (let field in this.mailOptions)
        {
            if (typeof this.mailOptions[field] == typeof "")
            {
                let template = `\`${this.mailOptions[field]}\``;
                this.mailOptions[field] = this.parseTemplate(template, ctx);
            }
        }
        return this.mailOptions;
    }

    parseTemplate(s, params)
    {
        return Function(...Object.keys(params), "return " + s)(...Object.values(params));
    }
}
