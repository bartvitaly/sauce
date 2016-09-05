'use strict';

/**
 * This class describes a Product page
 * 
 * @bartvitaly
 */

var common = require('../../common/common.js');

var productPage = function() {

	// Main product image
	this.image = by.css(".owl-item.active img");

	// Image controls
	this.front = by.css("[ng-class*='front']");
	this.back = by.css("[ng-class*='back']");
	this.countdown = by.css(".countdown-component");

	// Order controls
	this.style = by.css("[name='product_style_input']");
	this.price = by.css(".product-price");
	this.size = by.css("[id='product_size_input']");
	this.quantity = by.css("[id='product_qty_input']");

	// Checkout controls
	this.addToCart = by.css("[id='AddToCart']");
	this.payWithCreditCard = by.css("[id='CCCheckout']");
	this.checkoutWithPaypal = by.css(".payment-container ul");

	// Shopping card
	this.cardItems = ".item-basket";
	this.cardItemQuantity = ".label";
	this.cardItemPrice = ".inc";
	this.cardItemNameSize = "h3";
	this.cardItemRemove = ".remove-item";

	// Coupon section
	this.haveCoupon = by.css("[ng-click*='haveACoupon']");
	this.haveCouponInput = by.css("[ng-model='couponCode']");
	this.apply = by.css("[ng-click='applyCoupon()']");

	// Finance
	this.subTotal = by.css(".panel-basket .col:nth-of-type(2) p:nth-of-type(1)");
	this.discount = by.css(".discount");

	/*
	 * Methods
	 */

	// Get a product price
	this.getPrice = function() {
		return common.isPresent(this.style).then(function(stylePresent) {
			if (stylePresent) {
				var productpage = new productPage();
				return common.getNumber(productpage.style).then(function(value) {
					return value;
				});
			} else {
				return common.getNumber(productpage.price).then(function(value) {
					return value;
				});
			}
		});
	};

	// checks order
	this.checkOrder = function(order, index) {
		var basketItem = this.cardItems + ":nth-of-type(" + index + ")";

		common.checkText(by.css(basketItem + ' ' + this.cardItemQuantity), order.quantity, true);
		common.checkText(by.css(basketItem + ' ' + this.cardItemNameSize), order.name, true);
		common.checkText(by.css(basketItem + ' ' + this.cardItemNameSize), order.size, true);
	};

	// remove item in a basket
	this.removeItem = function(index) {
		var basketItem = this.cardItems + ":nth-of-type(" + index + ")";
		common.click(by.css(basketItem + ' ' + this.cardItemRemove));
	};

	// checks front image
	this.showFront = function() {
		common.click(this.front);
		common.checkAttribute(this.image, 'src', 'front', true);
	};

	// checks back image
	this.showBack = function() {
		common.click(this.back);
		common.checkAttribute(this.image, 'src', 'back', true);
	};

	// adds an order to a card
	this.addOrderToCard = function(order) {
		common.select(this.size, order.size);
		common.select(this.quantity, order.quantity);
		common.click(this.addToCart);
	};

	// apply coupon
	this.applyCoupon = function(coupon) {
		common.click(this.haveCoupon);
		common.sendKeys(this.haveCouponInput, coupon);
		common.click(this.apply);
	};

	// clicks pay with card button
	this.payWithCard = function() {
		common.click(this.payWithCreditCard);
	};

	// clicks pay with card button
	this.payWithPaypal = function() {
		common.click(this.checkoutWithPaypal);
	};

};

module.exports = new productPage();