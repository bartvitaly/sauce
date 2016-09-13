'use strict';

/**
 * This class describes a Paypal page
 * 
 * @bartvitaly
 */

var common = require('../../common/common.js');

var paypalPage = function() {

	this.urlLogin = '/checkout/login';
	this.urlReview = '/checkout/review';

	this.frame = by.css("[id='injectedUnifiedLogin'] iframe");

	// Upper right card container
	this.amount = by.css(".formatCurrency [ng-bind-html='amount_formatted']");
	this.closeCart = by.css("[id='closeCart']");

	this.cardItems = "[ng-repeat*='item']";
	this.name = ".itemNameContainer span";
	this.price = "[ng-bind-html='amount_formatted']";

	this.total = by.css(".detail-extras li:nth-of-type(2) [ng-bind-html='amount_formatted']");
	this.shipping = by.css(".detail-extras li:nth-of-type(3) [ng-bind-html='amount_formatted']");
	this.subTotal = by.css(".subTotal [ng-bind-html='amount_formatted']");

	this.email = by.css("[id='email']");
	this.password = by.css("[id='password']");
	this.loginButton = by.css("[id='btnLogin']");

	this.paypalBalance = by.css("[amount='fs.amount.amount'] [ng-bind-html='amount_formatted']");
	this.continueButton = by.css("[id='confirmButtonTop']");

	/*
	 * Methods
	 */

	// login method
	this.login = function() {
		common.switchToFrame(this.frame);
		common.sendKeys(this.email, common.getProperty("paypal.email"));
		common.sendKeys(this.password, common.getProperty("paypal.password"));
		common.click(this.loginButton);
		common.switchToDefault();
	};

	// login method
	this.clickContinueButton = function() {
		common.click(this.continueButton);
	};

	this.checkAmount = function(amountExpected) {
		common.checkText(this.amount, amountExpected, true);
	};

	this.checkBalance = function(balanceExpected) {
		common.checkText(this.paypalBalance, balanceExpected, true);
	};

	// Checking of order name and price
	this.checkCardItems = function(order) {
		var index = 1;
		var cardItem = this.cardItems + ":nth-of-type(" + index + ")";
		var nameItem = by.css(cardItem + ' ' + this.name);
		var priceItem = by.css(cardItem + ' ' + this.price);

		common.checkText(nameItem, order.name, true);

		common.getNumber(priceItem).then(function(priceActual) {
			expect(parseFloat(priceActual) > 0).toBe(true);
			console.log('Checking price: ' + priceActual);
		});
	};

	// Checking of amount, total, shipping, subTotal values
	this.checkAmountsNotZero = function(promo) {
		common.getNumber(this.amount).then(function(amountActual) {
			expect(parseFloat(amountActual) > 0).toBe(true);
		});

		common.getNumber(this.total).then(function(totalActual) {
			expect(parseFloat(totalActual) > 0).toBe(true);
			console.log('Checking total: ' + totalActual);
		});

		if (promo != true) {
			common.getNumber(this.shipping).then(function(shippingActual) {
				expect(parseFloat(shippingActual) > 0).toBe(true);
				console.log('Checking shipping: ' + shippingActual);
			});
		}

		common.getNumber(this.subTotal).then(function(subTotalActual) {
			expect(parseFloat(subTotalActual) > 0).toBe(true);
			console.log('Checking subTotal: ' + subTotalActual);
		});
	};

};

module.exports = new paypalPage();
