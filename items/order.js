/**
 * This class describes an order object
 * 
 * @bartvitaly
 */

var common = require('../common/common.js');

var order = function() {

	if (common.getProductUrl() != '') {
		this.productUrl = common.getProductUrl();
	} else {
		this.productUrl = browser.baseUrl + browser.params.order.productUrl;
	}

	this.size = browser.params.order.size;
	this.quantity = browser.params.order.quantity;
	this.name = browser.params.order.name;
	this.number = 0;
	this.price = 0;

	this.getTitle = function() {
		var lastIndex = this.productUrl.lastIndexOf('/') + 1;
		var length = this.productUrl.length;
		return this.productUrl.substring(lastIndex, length);
	};

};

module.exports = new order();