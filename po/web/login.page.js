var commonFunctions = require('../../common/commonWeb.js');

var loginPage = function () {

	this.close = by.css("[id='choose_product_modal'] .close");	
	this.loginButton = by.css("button[class*='login-btn']");
	this.loginButtonOnDashBoard = by.xpath(".//*[text()='Log In']");
	this.emailInput = by.id("email_input");
	this.passwordInput = by.id("password_input"); 

	this.clickLoginButtonOnDashBoard = function () {
		commonFunctions.click(this.loginButtonOnDashBoard);
	};

	this.typeEmail = function (email) {
		commonFunctions.sendKeys(this.emailInput, email);
	};

	this.typePassword = function (password) {
		commonFunctions.sendKeys(this.passwordInput, password);		
	};

	this.clickLoginButton = function () {
		commonFunctions.click(this.loginButton);
	};

	this.login = function (email, password) {
		this.typeEmail(email);
		this.typePassword(password);
		this.clickLoginButton();
	};

	this.clickClose = function () {
		commonFunctions.click(this.close);
	};

};
module.exports = new loginPage();