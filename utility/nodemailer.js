const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // Use `true` for port 465, `false` for all other ports
    port: 465,
    auth: {
      user: "abhishek9661342993@gmail.com",
      pass: "yeth kyfi lqhl xvvd",
    },
  });

module.exports = transporter;