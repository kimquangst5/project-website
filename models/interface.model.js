const mongoose = require('mongoose');

const {
	Schema
} = mongoose

const boxProductShema = new Schema({
	boGoc: String,
	mauNen: String,
	mauChuSanPham: String,
	kichCoChuSanPham: String,
	mauChuSpKhiDiChuot: String,
	mauGiaSanPham: String,
	kichCoGiaSp: String,
	mauGiaGoc: String,
	kichCoGiaGoc: String,
	mauNenGiamGia: String,
	mauChuGiamGia: String,
	iconGiamGia: String
}, {
	timestamps: true
});

const InterfaceBoxProduct = mongoose.model('InterfaceBoxProduct', boxProductShema, 'interface-box-product');

module.exports = InterfaceBoxProduct;