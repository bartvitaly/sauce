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
var paypalPage = require('../../po/mobile/paypalpage.js');

var common = require('../../common/common.js');

describe('checkout paypal', function() {

	var orderNumberRetrieved;

	var shipping = new shippingInfo(user);
	shipping.firstName = "Viralstyle";
	shipping.lastName = "Tester";
	shipping.address = '1 Main St';
	shipping.aptSuite = '';
	shipping.city = 'San Jose';
	shipping.state = 'CA';
	shipping.zipCode = '95131';
	shipping.country = '';
	shipping.countryShort = '';

	it('1. Opening a product page.', function() {
		console.log('Opening a product page.');
		browser.get(order.productUrl);
		common.waitUrl(order.productUrl).then(function(urlCheck) {
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

	it('3. Checking order and shipping details', function() {
		common.waitUrl(browser.baseUrl + orderPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Checking order and shipping details.');
			orderPage.checkOrder(order);
			orderPage.checkShipping(shipping);
			common.getTextPromise(orderPage.orderNumber).then(function(orderNumber) {
				orderNumberRetrieved = orderNumber.replace('YOUR ORDER# ', '');
				;
			});
			common.click(orderPage.orderSummary);
		});
	});

	it('4. Check order, shipping details on the order summary page', function() {
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
