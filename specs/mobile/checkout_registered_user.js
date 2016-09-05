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

describe('product', function() {
	var orderNumberRetrieved;

	var shipping = new shippingInfo(user);

	user.firstName = browser.params.user.firstName;
	user.lastName = browser.params.user.lastName;
	user.email = browser.params.user.email;
	user.password = browser.params.user.password;
	user.phone = '';

	shipping.firstName = browser.params.user.firstName;
	shipping.lastName = browser.params.user.lastName;
	shipping.email = browser.params.user.email;

	it('1. Opening a product page.', function() {
		console.log('Opening a product page');
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
			console.log('Check fields validation');
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
			console.log('Checking order and shipping details');
			orderPage.checkOrder(order);
			orderPage.checkShipping(shipping);
			common.getTextPromise(orderPage.orderNumber).then(function(orderNumber) {
				orderNumberRetrieved = orderNumber.replace('YOUR ORDER# ', '');
				;
			});
			common.click(orderPage.orderSummary);
		});
	});

	it('4. Check order, shipping details on the order summary page.', function() {
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log(orderNumberRetrieved);
			console.log('Check order, shipping details on the order summary page.');
			order.number = orderNumberRetrieved;
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
			trackOrderPage.track(orderNumberRetrieved, shipping.zipCode);
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
