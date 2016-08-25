'use strict';

/**
 * This is a product test
 * 
 * @bartvitaly
 */

var homePage = require('../po/mobile/homePage.js');
var trackOrderPage = require('../po/mobile/trackOrderPage.js');
var orderSummaryPage = require('../po/mobile/orderSummaryPage.js');

var common = require('../common/common.js');

describe('Track order test.', function() {

	var orderNumber = 'VS201682300000540';
	var zipCode = '123';
	var orderNumberRetrieved;

	it('1. Open track order page', function() {
		browser.get(browser.baseUrl + trackOrderPage.url);
		common.waitUrl(browser.baseUrl + trackOrderPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			console.log('Checking fields validation.');
			common.click(trackOrderPage.trackOrder);
			common.checkValidation(trackOrderPage.errors, trackOrderPage.errorsArrayFull);
		});
	});

	it('2. Fill order number and zip code and click login button.', function() {
		console.log('Fill order number and zip code and click login button.');
		trackOrderPage.track(orderNumber, zipCode);
	});

	it('3. Check an order number.', function() {
		console.log('Check an order number.');
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			common.getTextPromise(orderSummaryPage.orderNumber).then(function(orderNumber) {
				orderNumberRetrieved = orderNumber.replace('ORDER# ', '');
				;
			});
			common.checkText(orderSummaryPage.orderNumber, 'ORDER# ' + orderNumber, true);
		});
	});

	it('4. Open track order page.', function() {
		console.log('Open track order page.');
		browser.get(browser.baseUrl + trackOrderPage.url);
		common.waitUrl(browser.baseUrl + trackOrderPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			trackOrderPage.track(orderNumberRetrieved, zipCode);
		});
	});

	it('5. Check an order number on the order summary page.', function() {
		console.log('Check an order number on the order summary page.');
		common.waitUrl(browser.baseUrl + orderSummaryPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			common.checkText(orderSummaryPage.orderNumber, 'ORDER# ' + orderNumberRetrieved, true);
		});
	});

});
