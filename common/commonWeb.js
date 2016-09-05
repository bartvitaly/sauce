var commonFunctions = function() {

	this.click = function(elementBy) {
		console.log('Clicking element: ' + elementBy);
		browser.wait(new protractor.until.Condition('some condition', function() {
			return browser.driver.findElement(elementBy).isDisplayed();
		}), 120000).then(function() {
			browser.driver.findElement(elementBy).click();
		});
	};

	this.sendKeys = function(elementBy, text) {
		console.log('Typing text: \'' + text + '\', into field: ' + elementBy);
		browser.wait(new protractor.until.Condition('some condition', function() {
			return browser.driver.findElement(elementBy).isDisplayed();
		}), 120000).then(function() {
			browser.driver.findElement(elementBy).clear();
			browser.driver.findElement(elementBy).sendKeys(text);
		});
	};
};
module.exports = new commonFunctions();