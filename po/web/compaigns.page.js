var compaignsPage = function () {
	this.clickDesignerButton = function () {
		browser.driver.findElement(by.css("a[href='/design.beta']")).click();
	};
};
module.exports = new compaignsPage();