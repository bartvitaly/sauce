'use strict';

/**
 * This is a registration test
 * 
 * @bartvitaly
 */
var _ = require("underscore");

var common = require('../../common/common.js');

var homePage = require('../../po/mobile/homepage.js');
var signUpPage = require('../../po/mobile/signuppage.js');
var clientPage = require('../../po/mobile/clientpage.js');
var loginPage = require('../../po/mobile/loginpage.js');

describe('Registration test.', function() {
	var user = require('../../items/user.js');
	user = _.clone(user);

	it('1. Open sign up page.', function() {
		console.log('Open sign up page');
		browser.get(browser.baseUrl);
		homePage.openSignUp();
	});

	it('2. Checking fields validation.', function() {
		console.log('Checking fields validation.');
		common.click(signUpPage.signUpButton);
		common.checkValidation(signUpPage.errors, signUpPage.errorsArrayFull);
	});

	it('3. Fill all the required fields and click submit button.', function() {
		console.log('Fill all the required fields and click submit button.');
		signUpPage.register(user);
	});

	it('4. Logout from client page.', function() {
		console.log('Logout from client page.');
		clientPage.logout();
	});

	it('5. Fill email and password and click login button', function() {
		console.log('Fill email and password and click login button.');
		homePage.openLogin();
		loginPage.login(user);
	});

	it('6. Logout.', function() {
		console.log('Logout.');
		clientPage.logout();
	});

	it('7. Check a user is logged out.', function() {
		console.log('Check a user is logged out.');
		common.click(homePage.menu);
		expect(element(homePage.login).isPresent());
	});

});
