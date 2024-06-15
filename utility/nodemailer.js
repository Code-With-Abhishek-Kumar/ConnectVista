const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // For gmail you need to use smtp.gmail.com which allow you to send mail using Gmail
    secure: true, // Use `true` for port 465, `false` for all other ports
    port: 465,
    auth: {
      user: "abhishek9661342993@gmail.com", // Enter Your email id here Which you want to send mail throw that email id
      pass: "yeth kyfi lqhl xvvd",
    },
  });

module.exports = transporter;