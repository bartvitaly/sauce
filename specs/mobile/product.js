'use strict';

/**
 * This is a product test
 * 
 * @bartvitaly
 */

var productPage = require('../../po/mobile/productpage.js');
var order = require('../../items/order.js');

var common = require('../../common/common.js');

describe('product', function() {

	var price = 0;

	var couponName = common.getProperty("coupon.code");
	var couponValue = common.getProperty("coupon.value");

	it('1. Open product page.', function() {
		console.log('Open product page');
		browser.get(order.productUrl);
		productPage.showBack();
		productPage.showFront();

		// Get a product price
		productPage.getPrice().then(function(value) {
			price = parseFloat(value);
		});

	});

	it('2. Add a product to card and apply a coupon.', function() {
		console.log('Add a product to card');
		productPage.addOrderToCard(order);
		productPage.checkOrder(order, 1);

		console.log('Apply a coupon and check discount value.');
		productPage.applyCoupon(couponName);
		var discount = common.calculateDiscount(price, couponValue);

		common.checkText(productPage.subTotal, price, true);
		common.checkText(productPage.discount, discount, true);
	});

	it('3. Add one more product to card.', function() {
		console.log('Add one more product to card.');
		order.size = 'M';
		order.quantity = 2;
		productPage.addOrderToCard(order);
		productPage.checkOrder(order, 2);

		order.size = 'S';
		order.quantity = 1;
		productPage.checkOrder(order, 1);
	});

	it('4. Check new discount and remove an item from a basket.', function() {
		console.log('Check new discount and remove an item from a basket.');
		var quantity = 3;
		var discount = common.calculateDiscount(price * quantity, couponValue);

		common.checkText(productPage.subTotal, price * quantity, true);
		common.checkText(productPage.discount, discount, true);

		productPage.removeItem(1);
	});

	it('5. Check details after removing an item.', function() {
		common.waitUrl(order.productUrl).then(function(urlCheck) {
			expect(urlCheck).toBe(true);
			console.log('Check details after removing an item.');
			order.size = 'M';
			order.quantity = 2;
			productPage.checkOrder(order, 1);

			var discount = common.calculateDiscount(price * order.quantity, couponValue);
			common.checkText(productPage.subTotal, price * order.quantity, true);
			common.checkText(productPage.discount, discount, true);
			productPage.removeItem(1);
		});
	});
});
