var navBar = function () {
	this.clickLoginButton = function () {
		browser.driver.findElement(by.xpath(".//*[text()='Log In']")).click();
	};

	this.clickLogoutButton = function () {
		browser.driver.findElement(by.xpath(".//*[text()='LOGOUT']")).click();
/*				browser.driver.findElement(by.css(".img-circle")).click();
		browser.sleep(2000);
		browser.driver.findElement(by.css("a[href*='logout']")).click();*/

	};

};
module.exports = new navBar();