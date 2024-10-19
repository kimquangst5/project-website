const streamUpload = require("../../utils/streamUpload.util")
const multer = require('multer')
const upload = multer()
const uploadCloudMiddleWares = require('../../middlewares/admin/uploadCloud.middlewares');
module.exports.deleteSingle = (nameImage) => {
	cloudinary.uploader.destroy(nameImage, {
		invalidate: true
	}, (result) => {});
}

module.exports.deleteMulti = (nameImage) => {
	cloudinary.api.delete_resources(nameImage, (result) => {

	});
}

module.exports.uploadSingle = (req, res, next) => {
	if (req.file) {
		const uploadToCloudinary = async (buffer) => {
			let result = await streamUpload(buffer);
			req.body[req.file.fieldname] = result.url;
			req.body.nameImage = result.public_id;

			next();
		};
		uploadToCloudinary(req.file.buffer)
	} else {
		next();
	}
}

module.exports.uploadMulti = (req, res, next) => {
	try {
		const result = req.files
		if (!result.avatar && !result.audio) {
			next();
		} else {
			if (result.avatar && !result.audio) {
				if (result.avatar.length > 0) {
					req.body.avatar = []
					Promise.all(result.avatar.map(avatar => {
						if (avatar.buffer) {
							const uploadToCloudinary = async (buffer) => {
								let kq = await streamUpload(buffer);
								req.body.avatar.push(kq.url)
								next();
							};
							uploadToCloudinary(avatar.buffer)
						}
					}))
				}
			} else if (!result.avatar && result.audio) {
				if (result.audio.length > 0) {
					req.body.audio = []
					Promise.all(result.audio.map(avatar => {
						if (avatar.buffer) {
							const uploadToCloudinary = async (buffer) => {
								let kq = await streamUpload(buffer);
								req.body.audio.push(kq.url)
								next();
							};
							uploadToCloudinary(avatar.buffer)
						}
					}))
				}
			} else {
				if (result.avatar.length > 0 && result.audio.length > 0) {
					req.body.avatar = []
					Promise.all(result.avatar.map(avatar => {
						if (avatar.buffer) {
							const uploadToCloudinary = async (buffer) => {
								let kq = await streamUpload(buffer);
								req.body.avatar.push(kq.url)
							};
							uploadToCloudinary(avatar.buffer)
						}
					}))
					req.body.audio = []
					Promise.all(result.audio.map(avatar => {
						if (avatar.buffer) {
							const uploadToCloudinary = async (buffer) => {
								let kq = await streamUpload(buffer);
								req.body.audio.push(kq.url)
								next();
							};
							uploadToCloudinary(avatar.buffer)
						}
					}))
				}
			}

		}
	} catch (error) {
		next();
	}

}

module.exports.uploadFields = async (req, res, next) => {
	if (req.files.thumbnail) {
		req.body.thumbnail = [];
		const uploadFullImage = async (array) => {
			for (const image of array) {
				console.log(image.buffer)
				const uploadToCloudinary = async (buffer) => {
					let result = await streamUpload(buffer);
					req.body.thumbnail.push(result.url)
					// req.body.nameImage = result.public_id;

				};
				await uploadToCloudinary(image.buffer)
			}
		}
		await uploadFullImage(req.files.thumbnail);
		console.log(req.body.thumbnail)

		next();
	} else {
		next();
	}
}