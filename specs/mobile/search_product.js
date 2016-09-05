'use strict';

/**
 * This is a search product test
 * 
 * @bartvitaly
 */
var _ = require("underscore");

var common = require('../../common/common.js');

var homePage = require('../../po/mobile/homepage.js');
var marketplacePage = require('../../po/mobile/marketplacepage.js');

var order = require('../../items/order.js');

describe('Search product test.', function() {

	var title = '';

	it('1. Open shop page.', function() {
		console.log('Open shop page.');
		browser.get(browser.baseUrl);
		common.waitUrl(browser.baseUrl).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			common.click(homePage.menu);
			common.click(homePage.shop);
		});
	});

	it('2. Search for a product.', function() {
		console.log('Search for a product.');
		browser.get(marketplacePage.url);
		common.waitUrl(marketplacePage.url).then(function(urlVerified) {
			title = order.getTitle(order);
			marketplacePage.searchProduct(title);
			marketplacePage.openProduct(1);
		});
	});

	it('3. Check a product page is opened.', function() {
		console.log('Check a product page is opened.');
		common.waitUrl(order.productUrl).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
		});
	});

});
