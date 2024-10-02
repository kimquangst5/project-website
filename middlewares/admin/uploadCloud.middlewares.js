const streamUpload = require("../../utils/streamUpload.util")

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
		(req.file.buffer)
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