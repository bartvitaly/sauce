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

	it('2. Check required fields validation.', function() {
		common.waitUrl(browser.baseUrl + checkoutPage.url).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Check fields validation.');
			common.click(checkoutPage.completeOrder);
			common.checkValidation(checkoutPage.errors, checkoutPage.errorsArrayFull, ' is required');
		});
	});

	it('3. Check fields validation.', function() {
		
	});
	
});
