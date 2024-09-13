const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config();

// Configuration
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
});

module.exports.deleteSingle = (nameImage) => {
	cloudinary.uploader.destroy(nameImage, { invalidate: true }, (result) => {

	});
}

module.exports.deleteMulti = (nameImage) => {
	cloudinary.api.delete_resources(nameImage, (result) => {
		
	});
}


module.exports.uploadSingle = (req, res, next) => {
	if (req.file) {
		const streamUpload = (buffer) => {
			return new Promise((resolve, reject) => {
				let stream = cloudinary.uploader.upload_stream(
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
		const uploadToCloudinary = async (buffer) => {
			let result = await streamUpload(buffer);
			req.body[req.file.fieldname] = result.url;
			req.body.nameImage = result.public_id;

			next();
		};
		uploadToCloudinary(req.file.buffer)
	}
	else {
		next();
	}
}