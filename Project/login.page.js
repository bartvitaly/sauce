var loginPage = function () {
	this.clickLoginButtonOnDashBoard = function () {
		browser.driver.findElement(by.xpath(".//*[text()='Log In']")).click();
	};

	this.typeEmail = function (email) {
		browser.driver.findElement(by.id("email_input")).sendKeys(email);
	};

	this.typePassword = function (password) {
		browser.driver.findElement(by.id("password_input")).sendKeys(password);
	};

	this.clickLoginButton = function () {
		browser.driver.findElement(by.css("button[class*='login-btn']")).click();
	};

	this.login = function (email, password) {
		this.typeEmail(email);
		this.typePassword(password);
		this.clickLoginButton();
	};

	this.clickClose = function () {
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.xpath(".//*[@class='modal-dialog modal-lg']//button[@aria-label='Close']"));
		}, 20000);
		browser.driver.findElement(by.xpath(".//*[@class='modal-dialog modal-lg']//button[@aria-label='Close']")).click();
	};

};
module.exports = new loginPage();