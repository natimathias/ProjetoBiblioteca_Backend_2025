var nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  }
});

var mailOptions = {
  from: '',
  to: '',
  subject: '',
  text: ''
};

let enviarEmail = function(emailDestino, assunto, mensagem){
    mailOptions.to = emailDestino;
    mailOptions.subject = assunto;
    mailOptions.text = mensagem;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = enviarEmail;