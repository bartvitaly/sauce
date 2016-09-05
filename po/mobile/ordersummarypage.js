'use strict';

/**
 * This class describes an order summary page
 * 
 * @bartvitaly
 */

var common = require('../../common/common.js');

var orderSummaryPage = function() {

	this.url = '/order-summary';

	this.title = by.css("div h1");

	// Order information
	this.orderNumber = by.css(".title-order > div > div:nth-of-type(1) h2");
	this.updated = by.css(".title-order > div > div:nth-of-type(2) h2");

	this.orderImage = by.css(".product-summary-table img");
	this.orderName = by.css(".product-summary-table span");
	this.orderSize = by.css("[ng-repeat*='product'] div:nth-of-type(2)");
	this.orderQuantity = by.css("[ng-repeat*='product'] div:nth-of-type(3)");
	this.orderPrice = by.css("[ng-repeat*='product'] div:nth-of-type(4)");

	// Shipping Address
	this.address = by.css("address.ng-binding");
	this.country = by.css("[ng-show*='country']");

	this.changeAddress = by.css("[ng-if*='update_address']");

	this.subTotal = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(1)");
	this.shipping = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(3)");
	this.discount = by.css(".panel-basket .col:nth-of-type(2) [ng-show*='discount']");
	this.total = by.css(".bar-basket .col:nth-of-type(2) .inc");

	this.orderPlaceDate = by.css(".history-list-item span:nth-of-type(1)");

	/*
	 * Methods
	 */

	this.checkOrder = function(order) {
		common.checkText(this.title, 'ORDER SUMMARY', false);
		common.checkAttribute(this.orderImage, 'src', 'front', true);

		if (order.number != null && order.number != '') {
			common.checkText(this.orderNumber, 'ORDER# ' + order.number, true);
		}
		common.checkText(this.orderSize, order.size, true);
		common.checkText(this.orderName, order.name.toUpperCase(), true);
		common.checkText(this.orderQuantity, order.quantity, false);
		if (order.price != null && order.price != '') {
			common.checkText(this.orderPrice, order.price, true);
		}
	};

	this.checkShipping = function(shipping) {
		common.checkText(this.address, shipping.firstName, true);
		common.checkText(this.address, shipping.lastName, true);
		common.checkText(this.address, shipping.address, true);
		common.checkText(this.address, shipping.aptSuite, true);
		common.checkText(this.address, shipping.city, true);
		common.checkText(this.address, shipping.state, true);
		common.checkText(this.address, shipping.zipCode, true);
		common.checkText(this.address, shipping.countryShort, true);
	}

};

module.exports = new orderSummaryPage();
