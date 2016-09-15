'use strict';

/**
 * This is a checkout and coupon test
 * 
 * @bartvitaly
 */

var user = require('../../items/user.js');
var shippingInfo = require('../../items/shipping.js');
var order = require('../../items/order.js');

var productPage = require('../../po/mobile/productpage.js');
var checkoutPage = require('../../po/mobile/checkoutpage.js');
var orderPage = require('../../po/mobile/orderpage.js');
var orderSummaryPage = require('../../po/mobile/ordersummarypage.js');

var common = require('../../common/common.js');

describe('Checkout with coupon test.', function() {

	var price = 0;
	var discount = 0;
	var shippingPrice = 0;

	var couponName = common.getProperty("coupon.code");
	var couponValue = common.getProperty("coupon.value");

	var shipping = new shippingInfo(user);

	it('0. Opening a product page', function() {
		console.log('Opening a product page.');
		browser.get(order.productUrl);
		common.waitUrl(order.productUrl).then(function(urlCheck) {
			expect(urlCheck).toBe(true);

			// Get a product price
			productPage.getPrice().then(function(value) {
				price = parseFloat(value);
				discount = common.calculateDiscount(parseFloat(value), couponValue);
			});

			productPage.addOrderToCard(order);
			productPage.applyCoupon(couponName);
			productPage.payWithCard();
		});
	});

	it('1. Fill all the required data.', function() {
		common.waitUrl(checkoutPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);

			console.log('Fill all the required data.');
			checkoutPage.fillShippingInformation(shipping);
			checkoutPage.fillPaymentInformation(shipping);
		});
	});

	it('2. Check order and prices on checkout page.', function() {
		common.waitUrl(checkoutPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);

			console.log('Check order.');
			order.price = price;
			checkoutPage.checkOrder(order, 1);

			console.log('Checking subtotal, discount and shipping price.');
			common.checkText(checkoutPage.subTotal, price, true);
			common.checkText(checkoutPage.discount, discount, true);

			console.log('Getting shipping price.');
			common.getNumber(checkoutPage.shipping).then(function(shippingPriceActual) {
				shippingPrice = parseFloat(shippingPriceActual);
				expect(shippingPrice > 0).toBe(true);

				console.log('Shipping price: ' + shippingPrice);
				console.log('Price: ' + price);
				console.log('Discount: ' + discount);

				common.getNumber(checkoutPage.total).then(function(total) {
					common.checkNumberPrecision(total, (price + shippingPrice - discount).toFixed(2), 0.01);
				});
			});

			common.click(checkoutPage.completeOrder);
		});
	});

	it('3. Check order and prices on the order page.', function() {
		common.waitUrl(browser.baseUrl + orderPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);

			console.log('Checking order');
			orderPage.checkOrder(order);

			console.log('Checking subtotal, total, discount and shipping price.');
			// orderPage.checkText(orderPage.subTotal, price, true);
			common.getNumber(orderPage.total).then(function(total) {
				common.checkNumberPrecision(total, (price + shippingPrice - discount).toFixed(2), 0.01);
			});
			common.checkText(orderPage.shipping, shippingPrice, true);
			common.click(orderPage.orderSummary);
		});
	});

	it('4. Check order and prices on the order summary page.', function() {
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Check order on the order summary page');
			orderSummaryPage.checkOrder(order);

			// common.checkText(orderSummaryPage.subTotal, price,
			// true);
			common.checkText(orderSummaryPage.shipping, shippingPrice, true);
			// common.checkText(orderSummaryPage.discount, discount,
			// true);
			common.getNumber(orderSummaryPage.total).then(function(total) {
				common.checkNumberPrecision(total, (price + shippingPrice - discount).toFixed(2), 0.01);
			});
		});
	});

});
