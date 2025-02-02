const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');
const path = require('path');
const Transport = require('nodemailer-brevo-transport');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Pratham.S.K <${process.env.EMAIL_FROM}>`;    
  }

  newTransport() {
    console.log(process.env.NODEENV);
    if (process.env.NODEENV === 'development') {
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.BREVO_PASSWORD,
        },
      });
    }
          
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send actual mail
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      path.join(__dirname, '../views/email', `${template}.pug`),
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      }
    });
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Adventours');
  }

  async sendReset() {
    await this.send('passReset', 'Reset your password (valid for 10 min)');
  }
};
