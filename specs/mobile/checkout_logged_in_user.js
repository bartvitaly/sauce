'use strict';

/**
 * This is a checkout test for logged in user
 * 
 * @bartvitaly
 */

var user = require('../../items/user.js');
var shippingInfo = require('../../items/shipping.js');
var order = require('../../items/order.js');

var homePage = require('../../po/mobile/homepage.js');
var loginPage = require('../../po/mobile/loginpage.js');
var productPage = require('../../po/mobile/productpage.js');
var checkoutPage = require('../../po/mobile/checkoutpage.js');
var orderPage = require('../../po/mobile/orderpage.js');
var orderSummaryPage = require('../../po/mobile/ordersummarypage.js');
var trackOrderPage = require('../../po/mobile/trackorderpage.js');

var common = require('../../common/common.js');

describe('checkout logged in user', function() {
	user.email = common.getProperty("user.email");
	user.password = common.getProperty("user.password");

	var shipping = new shippingInfo(user);

	it('0. A user logs in.', function() {
		console.log('A user logs in.');
		browser.get(browser.baseUrl);
		common.waitUrl(browser.baseUrl).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			common.click(homePage.menu);
			common.click(homePage.login);
			loginPage.login(user);
		});
	});

	it('1. Opening a product page.', function() {
		common.waitUrl(browser.baseUrl + homePage.url).then(function(urlVerified) {
			console.log('Opening a product page.');
			expect(urlVerified).toBe(true);
			browser.get(order.productUrl);
			common.waitUrl(order.productUrl).then(function(urlVerified) {
				expect(urlVerified).toBe(true);
				productPage.addOrderToCard(order);
				productPage.payWithCard();
			});
		});
	});

	it('2. Check fields validation, fill all the required data to complete an order.', function() {
		common.waitUrl(browser.baseUrl + checkoutPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			console.log('Check fields validation');
			common.click(checkoutPage.completeOrder);
			common.checkValidation(checkoutPage.errors, checkoutPage.errorsArrayLoggedIn, ' is required');
			checkoutPage.checkPrefilledUserData(user);
			console.log('Fill all the required data to complete an order');
			checkoutPage.fillShippingInformation(shipping);
			checkoutPage.fillPaymentInformation(shipping);
			common.click(checkoutPage.completeOrder);
		});
	});

	it('3. Check order and shipping details.', function() {
		common.waitUrl(browser.baseUrl + orderPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			console.log('Checking order and shipping details.');
			orderPage.checkOrder(order);
			orderPage.checkShipping(shipping);
			common.getTextPromise(orderPage.orderNumber).then(function(orderNumber) {
				order.number = orderNumber.replace('YOUR ORDER# ', '');
			});
			common.click(orderPage.orderSummary);
		});
	});

	it('4. Check order, shipping details on the order summary page.', function() {
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
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
