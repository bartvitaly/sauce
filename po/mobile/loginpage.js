'use strict';

/**
 * This class describes a Login page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var loginPage = function() {

	// Validation errors
	this.errorsArrayFull = [ 'Please enter your email address.', 'Please enter your password.' ];

	this.errors = by.css(".help-block:not(.ng-hide):not(.ng-binding)");

	this.email = by.css(".login [id='email_input']");
	this.password = by.css(".login [id='password_input']");
	this.loginButton = by.css(".login-btn span");
	this.signUpButton = by.css("[ng-click='login.showRegister()']");
	this.rememberCheckbox = by.css("[for='remember_checkbox']");
	this.forgtotPasswordLink = by.css("[ng-click*='showForgotPasswordModal']");

	/*
	 * Methods
	 */

	// login method
	this.login = function(user) {
		commonFunctions.sendKeys(this.email, user.email);
		commonFunctions.sendKeys(this.password, user.password);
		commonFunctions.click(this.loginButton);
	};
};

module.exports = new loginPage();