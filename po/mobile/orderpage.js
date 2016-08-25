'use strict';

/**
 * This class describes an order page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var orderPage = function() {

	this.url = '/purchase/thank-you';

	this.title = by.css(".title h1");

	this.phone = by.css("[for='mobile_input']");
	this.save = by.css("[ng-click*='updatePhone']");

	this.password = by.css("[id='pass_input']");
	this.login = by.css("[ng-click*='linkOrder']");

	// Order information
	this.orderNumber = by.css(".order .title-order h2");
	this.orderSummary = by.css(".order [ng-click*='goToSummary']");
	this.orderImage = by.css(".order .item-basket img:not(.ng-hide)");
	this.orderSizeName = by.css(".order .item-basket .text h3");
	this.orderQuantity = by.css(".order .item-basket .inc h3");
	this.orderPrice = by.css(".order .item-basket .inc");

	// Shipping Address
	this.address = by.css("address.ng-binding");
	this.country = by.css("[ng-show*='country']");

	this.subTotal = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(1)");
	this.shipping = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(3)");
	this.total = by.css(".bar-basket .col:nth-of-type(2) .inc");

	// Upsell popup
	this.oldPrice = by.css(".sales-list li:nth-of-type(1)");
	this.newPrice = by.css(".sales-list li:nth-of-type(2)");
	this.addToMyOrder = by.css("a.btn");
	this.continueShopping = by.css("a.return");

	// Promo order
	this.promoItems = ".promo-order .item-basket";
	this.promoItemPrice = ".inc";
	this.promoItemNameSize = "h3";

	/*
	 * Methods
	 */

	this.checkOrder = function(order) {
		commonFunctions.checkText(this.title, 'THANK YOU FOR YOUR ORDER.', false);
		commonFunctions.checkAttribute(this.orderImage, 'src', 'front', true);

		commonFunctions.checkText(this.orderNumber, 'YOUR ORDER# ', true);
		commonFunctions.checkText(this.orderSizeName, order.size, true);
		commonFunctions.checkText(this.orderSizeName, order.name, true);
		commonFunctions.checkText(this.orderQuantity, order.quantity + ' x', false);
		if (order.price != null && order.price != '') {
			commonFunctions.checkText(this.orderPrice, order.price, true);
		}
	};

	this.checkShipping = function(shipping) {
		commonFunctions.checkText(this.address, shipping.firstName, true);
		commonFunctions.checkText(this.address, shipping.lastName, true);
		commonFunctions.checkText(this.address, shipping.address, true);
		commonFunctions.checkText(this.address, shipping.aptSuite, true);
		commonFunctions.checkText(this.address, shipping.city, true);
		commonFunctions.checkText(this.address, shipping.state, true);
		commonFunctions.checkText(this.address, shipping.zipCode, true);
		commonFunctions.checkText(this.address, shipping.countryShort, true);
	};

	this.savePhone = function(phone) {
		console.log('phone save' + phone);
		commonFunctions.sendKeys(this.phone, phone);
		commonFunctions.click(this.save);
	};

	this.login = function(pass) {
		console.log('pass login' + pass);
		commonFunctions.sendKeys(this.password, pass);
		commonFunctions.click(this.login);
	}

};

module.exports = new orderPage();
