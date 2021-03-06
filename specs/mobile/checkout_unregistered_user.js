'use strict';

/**
 * This is a checkout test
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
var trackOrderPage = require('../../po/mobile/trackorderpage.js');

var common = require('../../common/common.js');

describe('Checkout unregistered user.', function() {

	var shipping = new shippingInfo(user);

	it('1. Opening a product page.', function() {
		console.log('Opening a product page.');
		browser.get(order.productUrl);
		common.waitUrl(order.productUrl).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			productPage.addOrderToCard(order);
			productPage.payWithCard();
		});
	});

	it('2. Check fields validation, fill all the required data to complete an order.', function() {
		common.waitUrl(browser.baseUrl + checkoutPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Check fields validation.');
			common.click(checkoutPage.completeOrder);
			common.checkValidation(checkoutPage.errors, checkoutPage.errorsArrayFull, ' is required');
			console.log('Fill all the required data to complete an order');
			checkoutPage.fillShippingInformation(shipping);
			checkoutPage.fillPaymentInformation(shipping);
			common.click(checkoutPage.completeOrder);
		});
	});

	it('3. Check order and shipping details.', function() {
		common.waitUrl(browser.baseUrl + orderPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Check order and shipping details.');
			orderPage.checkOrder(order);
			orderPage.checkShipping(shipping);
			common.getTextPromise(orderPage.orderNumber).then(function(orderNumber) {
				order.number = orderNumber.replace('YOUR ORDER# ', '');
			});
			common.click(orderPage.orderSummary);
		});
	});

	it('4. Check order, shipping details on the order summary page.', function() {
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			common.setProperty("order.number", order.number);
			common.setProperty("order.zip", shipping.zipCode);

			console.log(order.number);
			common.setProperty("order.number", order.number);
			console.log('Check order, shipping details on the order summary page.');
			orderSummaryPage.checkOrder(order);
			orderSummaryPage.checkShipping(shipping);
			common.click(orderSummaryPage.changeAddress);
		});
	});

	it('5. Open track order page.', function() {
		console.log('Open track order page.');
		browser.get(browser.baseUrl + trackOrderPage.url);
		common.waitUrl(browser.baseUrl + trackOrderPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			trackOrderPage.track(order.number, shipping.zipCode);
		});
	});

	it('6. Check order information on the order summary page.', function() {
		console.log('Check order information on the order summary page.');
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			orderSummaryPage.checkOrder(order);
			orderSummaryPage.checkShipping(shipping);
		});
	});
});
