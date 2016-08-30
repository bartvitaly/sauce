'use strict';

/**
 * This is e2e checkout test
 * 
 * @bartvitaly
 */

var user = require('../items/user.js');
var shippingInfo = require('../items/shipping.js');
var order = require('../items/order.js');

var productPage = require('../po/mobile/productpage.js');
var checkoutPage = require('../po/mobile/checkoutpage.js');
var orderPage = require('../po/mobile/orderpage.js');
var orderSummaryPage = require('../po/mobile/ordersummarypage.js');
var trackOrderPage = require('../po/mobile/trackorderpage.js');

var common = require('../common/common.js');

describe('E2E checkout test', function() {

	var orderNumberRetrieved;
	var shipping = new shippingInfo(user);

	order.productUrl = common.getProductUrl();
	order.name = '';

	it('1. Opening a product page.', function() {
		console.log('Opening a product page ' + order.productUrl);
		browser.get(order.productUrl);
		common.waitUrl(order.productUrl).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			common.click(productPage.addToCart);
			productPage.payWithCard();
		});
	});

	it('2. Fill all the required data to complete an order.', function() {
		common.waitUrl(checkoutPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Fill all the required data to complete an order');
			checkoutPage.fillShippingInformation(shipping);
			checkoutPage.fillPaymentInformation(shipping);
			common.click(checkoutPage.completeOrder);
		});
	});

	it('3. Checking order and shipping details.', function() {
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

});
