module.exports = (array) => {
	array.totalPrice = 0
	for (const it of array) {
		it.priceNew = parseInt(((it.price - (it.price * it.discountPercentage) / 100).toFixed(0))/1000) * 1000
		// if (it.priceNew % 1000 <= 100) {
		// 	it.priceNew = parseInt(it.priceNew / 1000) - 1
		// 	it.priceNew = (1000 * it.priceNew + 990) * 1000
		// } else {
		// 	it.priceNew = it.priceNew * 1000
		// }


		it.priceOrigin = it.priceNew
		it.newPrice = it.priceNew
		array.totalPrice += (it.priceNew * it.quanlityProduct)
		it.priceItem = [it.priceNew * it.quanlityProduct].toLocaleString('en-EN')
		it.priceNew = [it.priceNew].toLocaleString('en-EN')
		it.priceOrigin = it.priceOrigin.toLocaleString('en-EN')

		
	}
	array.priceTotalAll = array.totalPrice
	array.totalPrice = array.totalPrice.toLocaleString('en-EN')
	for (const it of array) {
		it.priceOld = [it.price].toLocaleString('en-EN')
	}
	return array;
}