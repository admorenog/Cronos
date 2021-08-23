/*jshint esversion: 6*/
// refer nodemailer for more info

var transporter = {
  host: "smtps://smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "user@gmail.com",
    pass: "password",
  },
};

var mailOptions = {
    from: '"${ hostname.toUpperCase() } 🖥" <cronos@${ hostname }.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Cron ${ job.name } Executed ${ job.output.exitCode==0?"🙌":"🤬❗️" }', // Subject line
    text: '${ job.name } ${ job.output.exitCode==0?"everything ok":"something went wrong" }', // plaintext body
    html: '<b>${ job.name } 🐴</b> ${ job.output.exitCode==0?"🟢":"🔴" }', // html body
    template: "results.html",
    attach_error: true,
    attach_output: true
};

if (typeof window === 'undefined') {
  exports.transporter = transporter;
  exports.mailOptions = mailOptions;
} else {
  if (!window.config)
    window.config = {};
  window.config.transporter = transporter;
  window.config.mailOptions = mailOptions;
}
