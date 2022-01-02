import path from 'path';
import fs from 'fs';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

export default class Mail
{
    mailOptions: SendMailOptions;
    transporter: Transporter;
    templatesPath: string;
    template: string;
    attach_output: boolean;
    attach_error: boolean;

    constructor(options : any)
    {
        this.mailOptions = options.mailOptions;
        this.transporter = nodemailer.createTransport(options.transporter);
        this.templatesPath = path.join(__dirname, "/../config/templates/");
        this.template = options.template;
        if (!fs.existsSync(this.templatesPath))
        {
            throw new Error(`the templates path folder doesn't exists, check: ${this.templatesPath}`);
        }

    }

    sendMail(ctx, cb)
    {
        this.mailOptions = this.parseFields(ctx);
        return this.transporter.sendMail(this.mailOptions, cb);
    }

    getHtmlTemplate()
    {
        const templateFile = path.join(this.templatesPath, this.template);
        const htmlTemplate = fs.readFileSync(templateFile).toString();
        return htmlTemplate || this.mailOptions.html;
    }

    parseFields(ctx)
    {
        this.mailOptions.html = this.getHtmlTemplate();
        for (const field in this.mailOptions)
        {
            if (typeof this.mailOptions[field] == typeof "")
            {
                const template = `\`${this.mailOptions[field]}\``;
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
