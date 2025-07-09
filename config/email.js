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
  from: 'thcnatalia19@gmail.com',
  to: '',
  subject: '',
  text: ''
};

let enviarEmail = function(emailDestino, assunto, mensagem){
  if (!emailDestino || emailDestino.trim() === '') {
    console.error("Nenhum destinatário definido.");
    return;
  }

  mailOptions.to = emailDestino;
  mailOptions.subject = assunto;
  mailOptions.text = mensagem;

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("Erro ao enviar e-mail:", error);
    } else {
      console.log('Email enviado com sucesso:', info.response);
    }
  });
}


module.exports = enviarEmail;