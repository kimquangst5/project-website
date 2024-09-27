// Import the Nodemailer library
const nodemailer = require('nodemailer');
require('dotenv').config();
const Email = require("../models/email.model")
module.exports.sendMail = async (email, subject, html) => {
	const emailBatabase = await Email.find({});

	// Create a transporter object
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // use false for STARTTLS; true for SSL on port 465
		auth: {
			user: process.env.EMAIL,
			pass: process.env.pass,
		}
	});

	// Configure the mailoptions object
	const mailOptions = {
		from: `${emailBatabase[0].fullName} <${emailBatabase[0].from}>`,
		to: email,
		subject: subject,
		html: html
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
			// req.flash("error", "Không tồn tại email này!!!");
			// res.redirect("back");
			// return;
		} else {
			console.log('Email sent: ', info.response);
		}
	});
};