const nodemailer = require('nodemailer');

async function main(formData) {

  let transporter = nodemailer.createTransport({
    host: "your_SMTP_server",
    port: 587,
    secure: false,
    auth: {
      user: 'your_email',
      pass: 'your_password',
    },
  });

  let info = await transporter.sendMail({
    from: '"Contact Form" <your_email>',
    to: "alnotha@gmail.com",
    subject: "New message from contact form",
    text: `Full Name: ${formData.fullname} \nEmail: ${formData.email} \nMessage: ${formData.message}`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = main;
