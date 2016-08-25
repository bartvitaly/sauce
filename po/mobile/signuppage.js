/**
 * This class describes a signUp page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var signUpPage = function() {

	// Validation errors
	this.errorsArrayFull = [ 'Please enter your full name.', 'Please enter a public name.',
			'Please enter your email address.', 'Please enter your password.', 'Please confirm your password.',
			'Please accept the terms & conditions.' ];

	this.errors = by.css("[ng-show*='submitted'][ng-show*='registerForm']:not(.ng-hide):not(.ng-binding)");

	// fields
	this.name = by.css("[name='name']");
	this.publicName = by.css("[name='publicName']");
	this.email = by.css("[id='register_email_input']");
	this.password = by.css("[id='register_password_input']");
	this.passwordConfirm = by.css("[name='passwordConfirm']");

	// static elements
	this.termsCheckbox = by.css("[ng-class*='terms'] label");
	this.termsConditionsLink = by.css("[href='/terms'][class]");

	this.signUpButton = by.css("[state='register.submitState']");
	this.signInLink = by.css("[ng-click='register.toggleLogin()']");

	/*
	 * Methods
	 */

	this.register = function(user) {
		commonFunctions.sendKeys(this.name, user.firstName + ' ' + user.lastName);
		commonFunctions.sendKeys(this.publicName, user.publicName);
		commonFunctions.sendKeys(this.email, user.email);
		commonFunctions.sendKeys(this.password, user.password);
		commonFunctions.sendKeys(this.passwordConfirm, user.password);

		commonFunctions.click(this.termsCheckbox);
		commonFunctions.click(this.signUpButton);
	};
};

module.exports = new signUpPage();
