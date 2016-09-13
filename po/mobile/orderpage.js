'use strict';

/**
 * This class describes an order page
 * 
 * @bartvitaly
 */

var common = require('../../common/common.js');

var orderPage = function() {

	this.url = '/purchase/thank-you';

	this.title = by.css(".title h1");

	this.phone = by.css("[for='mobile_input']");
	this.save = by.css("[ng-click*='updatePhone']");

	this.password = by.css("[id='pass_input']");
	this.login = by.css("[ng-click*='linkOrder']");

	// Order information
	this.orderNumber = by.css(".order:not(.promo-order) .title-order h2");
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
	this.dicountText = by.css(".modal-body .col-sm-7");
	this.styleSelect = by.css("[ng-model='upsell.selectedGroup']");
	this.upsellSize = by.css(".size-list li.active");
	this.addToMyOrder = by.css("a.btn, [ng-click='paypalCheckout()'] .ng-scope");
	this.continueShopping = by.css("a.return");

	// Promo order
	this.promoOrderNumber = by.css(".promo-order h2");
	this.promoItems = by.css(".promo-order .item-basket");
	this.promoItemPrice = by.css(".promo-order .inc");
	this.promoItemNameSize = by.css(".promo-order h3");

	/*
	 * Methods
	 */

	this.checkOrder = function(order) {
		common.checkText(this.title, 'THANK YOU FOR YOUR ORDER.', false);
//		common.checkAttribute(this.orderImage, 'src', 'front', true);

		common.checkText(this.orderNumber, 'YOUR ORDER# ', true);
		common.checkText(this.orderSizeName, order.size, true);
		common.checkText(this.orderSizeName, order.name, true);
		common.checkText(this.orderQuantity, order.quantity + ' x', false);
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
		common.checkText(this.address, shipping.stateShort, true);
		common.checkText(this.address, shipping.zipCode, true);
		common.checkText(this.address, shipping.countryShort, true);
	};

	this.savePhone = function(phone) {
		console.log('phone save' + phone);
		common.sendKeys(this.phone, phone);
		common.click(this.save);
	};

	this.login = function(pass) {
		console.log('pass login' + pass);
		common.sendKeys(this.password, pass);
		common.click(this.login);
	}

};

module.exports = new orderPage();
