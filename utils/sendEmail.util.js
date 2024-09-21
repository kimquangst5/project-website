// Import the Nodemailer library
const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports.sendMail = (email, subject, html) => {

	// Create a transporter object
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // use false for STARTTLS; true for SSL on port 465
		auth: {
			user: process.env.email,
			pass: process.env.pass,
		}
	});

	// Configure the mailoptions object
	const mailOptions = {
		from: process.env.email,
		to: email,
		subject: subject,
		html: html
	};

	// Send the email
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			req.flash("error", "Không tồn tại email này!!!");
			res.redirect("back");
			return;
		} else {
			console.log('Email sent: ', info.response);
		}
	});
};