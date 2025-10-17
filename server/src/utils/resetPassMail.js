const nodemailer = require("nodemailer");
const config = require("../config");

const sendMail = async (email, subject, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtp_host,
      port: config.smtp_port,
      secure: true,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_pass,
      },
    });

    await transporter.sendMail({
      from: config.smtp_user,
      to: email,
      subject,
      html: template,
    });

  } catch (error) {
    console.error("Error sending email:", error);
  }
}


module.exports = sendMail;