'use strict';

/**
 * This class describes a Checkout page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var checkoutPage = function() {

	this.url = '/purchase/checkout';

	// Errors
	this.errorsArrayFull = [ 'Email address', 'First Name', 'Last Name', 'Address', 'City', 'Province/State',
			'Postal Code', 'Credit card number', 'Expiration month', 'Expiration year', 'CVV' ];
	this.errorsArrayLoggedIn = [ 'Address', 'City', 'Province/State', 'Postal Code', 'Credit card number',
			'Expiration month', 'Expiration year', 'CVV' ];
	this.errors = by.css(".help-block:not(.ng-hide)");

	// Customer information
	this.email = by.css("[id='cust_email_input']");

	// Shipping information
	this.firstName = by.css("[id='first_name_input']");
	this.lastName = by.css("[id='last_name_input']");
	this.address = by.css("[id='address_input']");
	this.aptSuite = by.css("[id='apt_input']");
	this.city = by.css("[id='city_input']");
	this.stateInput = by.css("input[id='state_input']");
	this.stateSelect = by.css("select[id='state_input']");
	this.zipCode = by.css("[name='zip']");
	this.country = by.css("[name='country']");
	this.phone = by.css("[name='mobile']");

	// Payment information
	this.cardNumber = by.css("[id='cc_num_input']");
	this.expMonth = by.css("[id='cc_month_input']");
	this.expYear = by.css("[id='cc_year_input']");
	this.cvv = by.css("[id='cc_cvv_input']");

	// Shopping card
	this.cardItems = ".item-basket";
	this.cardItemQuantity = ".label";
	this.cardItemPrice = ".inc";
	this.cardItemNameSize = "h3";
	this.cardItemRemove = ".remove-item";

	// Coupon section
	this.haveCoupon = by.css(".coupon-basket a");
	this.haveCouponInput = by.css("[ng-model='couponCode']");
	this.apply = by.css("[ng-click='applyCoupon()']");

	// Finance
	this.subTotal = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(1)");
	this.discount = by.css(".discount");
	this.shipping = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(4)");
	this.total = by.css(".bar-basket .col:nth-of-type(2) .inc");

	// Checkout controls
	this.completeOrder = by.css(".main-checkout-footer input");
	this.completeOrderBottom = by.css(".visible-sm-block input");

	// [ng-click='upsell.checkout()']

	/*
	 * Methods
	 */

	// checks order
	this.checkOrder = function(order, index) {
		var basketItem = this.cardItems + ":nth-of-type(" + index + ")";

		commonFunctions.checkText(by.css(basketItem + ' ' + this.cardItemQuantity), order.quantity, true);
		commonFunctions.checkText(by.css(basketItem + ' ' + this.cardItemNameSize), order.name, true);
		commonFunctions.checkText(by.css(basketItem + ' ' + this.cardItemNameSize), order.size, true);
		if (order.price != null && order.price != '') {
			commonFunctions.checkText(by.css(basketItem + ' ' + this.cardItemPrice), order.price, true);
		}
	};

	// check prefilled user data if logged in
	this.checkPrefilledUserData = function(user) {
		commonFunctions.checkAttribute(this.email, 'value', user.email);
		commonFunctions.checkAttribute(this.firstName, 'value', user.firstName);
		commonFunctions.checkAttribute(this.lastName, 'value', user.lastName);
	}

	// fill shipping info
	this.fillShippingInformation = function(shipping) {
		commonFunctions.sendKeys(this.email, shipping.email);
		commonFunctions.sendKeys(this.firstName, shipping.firstName);
		commonFunctions.sendKeys(this.lastName, shipping.lastName);
		commonFunctions.sendKeys(this.address, shipping.address);
		commonFunctions.sendKeys(this.aptSuite, shipping.aptSuite);
		commonFunctions.sendKeys(this.city, shipping.city);
		commonFunctions.select(this.country, shipping.country);
		if (shipping.country == 'United States') {
			commonFunctions.select(this.stateSelect, shipping.state);
		} else {
			commonFunctions.sendKeys(this.stateInput, shipping.state);
		}
		commonFunctions.sendKeys(this.zipCode, shipping.zipCode);
		commonFunctions.sendKeys(this.phone, shipping.phone);
	};

	// fill payment information
	this.fillPaymentInformation = function(shipping) {
		commonFunctions.sendKeys(this.cardNumber, shipping.cardNumber);
		commonFunctions.select(this.expMonth, shipping.expMonth);
		commonFunctions.select(this.expYear, shipping.expYear);
		commonFunctions.sendKeys(this.cvv, shipping.cvv);
	};

	this.applyCoupon = function(coupon) {
		commonFunctions.click(this.haveCoupon);
		commonFunctions.sendKeys(this.haveCouponInput, coupon);
		commonFunctions.click(this.apply);
	};
};

module.exports = new checkoutPage();