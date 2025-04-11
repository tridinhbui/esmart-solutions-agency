const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_KEY
  }
});

const sendEmail = async (req, res) => {

    const { email, message } = req.body;
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'Esmart - New Contact Form Submission',
        html: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        }
    });
};

module.exports = { sendEmail };
