'use strict';

/**
 * This is a login test
 * 
 * @bartvitaly
 */
var _ = require("underscore");

var common = require('../../common/common.js');

var homePage = require('../../po/mobile/homepage.js');
var loginPage = require('../../po/mobile/loginpage.js');
var clientPage = require('../../po/mobile/clientpage.js');

describe('Login test.', function() {
	var user = require('../../items/user.js');
	user = _.clone(user);
	user.email = common.getProperty("user.email");

	it('1. Open login page.', function() {
		console.log('Open login page.');
		browser.get(browser.baseUrl);
		common.waitUrl(browser.baseUrl).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			common.click(homePage.menu);
			common.click(homePage.login);
		});
	});

	it('2. Checking fields validation.', function() {
		console.log('Checking fields validation.');
		common.click(loginPage.loginButton);
		common.checkValidation(loginPage.errors, loginPage.errorsArrayFull);
	});

	it('3. Fill email and password and click login button', function() {
		console.log('Fill email and password and click login button');
		loginPage.login(user);
	});

	it('4. Waiting for client page', function() {
		console.log('Waiting for client page');
		common.waitUrl(browser.baseUrl + clientPage.url).then(function(urlVerified) {
			expect(urlVerified).toBe(true);
			console.log('Logout');
			clientPage.logout();
		});
	});

	it('5. Check home page is opened', function() {
		console.log('Check home page is opened');
		common.click(homePage.menu);
		expect(element(homePage.login).isPresent());
	});

});
