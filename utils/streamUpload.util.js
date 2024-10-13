const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config();

// Configuration
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
});

module.exports = (buffer) => {
	return new Promise((resolve, reject) => {
		let stream = cloudinary.uploader.upload_stream(
			{ resource_type: `auto` },
			(error, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			}
		);

		streamifier.createReadStream(buffer).pipe(stream);
	});
};