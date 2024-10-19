const Money = require("../models/money.model")
const moneySystem = require("../utils/money-system.util")

module.exports = async (money) => {
	const moneys = await Money.find({});
	if (moneys[0].separator == 'comma') {
		money = moneySystem.phay(money)
	} else {
		money = moneySystem.cham(money)
	}
	return money
};