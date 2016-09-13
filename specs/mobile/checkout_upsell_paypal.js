'use strict';

/**
 * This is a checkout and upsell test
 * 
 * @bartvitaly
 */

var user = require('../../items/user.js');
var shippingInfo = require('../../items/shipping.js');
var order = require('../../items/order.js');
var promoOrder = require('../../items/order.js');

var productPage = require('../../po/mobile/productpage.js');
var checkoutPage = require('../../po/mobile/checkoutpage.js');
var orderPage = require('../../po/mobile/orderpage.js');
var orderSummaryPage = require('../../po/mobile/ordersummarypage.js');
var trackOrderPage = require('../../po/mobile/trackorderpage.js');
var paypalPage = require('../../po/mobile/paypalpage.js');

var common = require('../../common/common.js');

describe('checkout upsell', function() {

	var price = 0;
	var shippingPrice = 0.00;
	var discount = 0;
	var oldPrice = 0;

	var upsellDiscount = 0;
	order.productUrl = common.getProperty("url.product.upsell");

	var promoOrderNumber;
	var subTotal;
	var shipping = new shippingInfo(user);
	shipping.paypal();
	
	it('1. Opening a product page.', function() {
		browser.get(order.productUrl);
		common.waitUrl(order.productUrl).then(function(urlCheck) {
			console.log('Opening a product page.');
			expect(urlCheck).toBe(true);
			productPage.addOrderToCard(order);
			browser.refresh();
			common.waitUrl(order.productUrl).then(function(urlCheck) {
				productPage.payWithPaypal();
			});
		});
	});

	it('2. Log into paypal and confirm payment.', function() {
		common.waitUrl(paypalPage.urlLogin).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Loging in to paypal.');
			paypalPage.login();

			common.waitUrl(paypalPage.urlReview).then(function(urlCheck) {
				expect(urlCheck).toBe(true);

				common.click(paypalPage.amount);
				paypalPage.checkCardItems(order);
				paypalPage.checkAmountsNotZero();
				common.click(paypalPage.closeCart);

				console.log('Confirming payment');
				paypalPage.clickContinueButton();
			});
		});
	});

	it('3. Checking upsell and add to the order', function() {
		common.waitUrl(browser.baseUrl + orderPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Checking upsell and add to the order.');

			// Get an old and new product prices
			common.getNumber(orderPage.oldPrice).then(function(value) {
				oldPrice = parseFloat(value);
				console.log('old price ' + oldPrice);
				console.log('discount ' + upsellDiscount);
				promoOrder.price = oldPrice - upsellDiscount;
				promoOrder.name = '';
				promoOrder.quantity = 1;
				console.log('promoOrder.price ' + promoOrder.price);

				// common.getNumber(orderPage.styleSelect).then(function(subTotalPromise)
				// {
				// subTotal = subTotalPromise;
				// console.log('subTotal ' + subTotal);
				// });

				// common.getTextPromise(orderPage.styleSelect).then(function(name)
				// {
				// var lastIndex = name.lastIndexOf('-') - 2;
				// promoOrder.name = name.substring(0, lastIndex);
				// console.log('promoOrder.name ' + promoOrder.name);
				// });

				common.getTextPromise(orderPage.upsellSize).then(function(size) {
					promoOrder.size = size;
					console.log('orderPage.upsellSize ' + promoOrder.size);
				});

				// discount =
				// common.calculateDiscount(parseFloat(value),
				// upsellDiscount);
				common.checkText(orderPage.newPrice, promoOrder.price, true);
			});

			common.click(orderPage.addToMyOrder);

			common.waitUrl(paypalPage.urlReview).then(function(urlCheck) {
				expect(urlCheck).toBe(true);

				common.click(paypalPage.amount);
//				paypalPage.checkCardItems(order);
				paypalPage.checkAmountsNotZero(true);
				common.click(paypalPage.closeCart);

				console.log('Confirming payment');
				paypalPage.clickContinueButton();
			});
			
			// Get upsell order
			common.getTextPromise(orderPage.promoOrderNumber).then(function(orderNumber) {
				promoOrderNumber = orderNumber.replace('YOUR PROMO ORDER# ', '');
			});

		});
	});

	it('4. Open track order page.', function() {
		console.log('Open track order page.');
		browser.get(browser.baseUrl + trackOrderPage.url);
		common.waitUrl(browser.baseUrl + trackOrderPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			trackOrderPage.track(promoOrderNumber, shipping.zipCode);
		});
	});

	it('5. Check order information on the order summary page.', function() {
		console.log('Check order information on the order summary page.');
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			orderSummaryPage.checkOrder(promoOrder);
			orderSummaryPage.checkShipping(shipping);

			// common.checkText(orderSummaryPage.subTotal, subTotal, true);
			common.checkText(orderSummaryPage.shipping, shippingPrice, true);
			// common.checkText(orderSummaryPage.discount, discount,
			// true);
			common.getNumber(orderSummaryPage.total).then(function(total) {
				common.checkNumberPrecision(total, promoOrder.price, 0.00);
			});
		});
	});

});
