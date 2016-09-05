var commonFunctions = require('../../common/commonWeb.js');

var designBetaPage = function() {

	this.addTextButton = by.css(".add_item_text");
	this.editTextInput = by.css("[id='options-add_item_text'] textarea");
	this.XOnForm = by.css('.glyphicons.remove_2.glyphicons-12.pull-right');
	this.showBackButton = by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Back")]');
	this.showFrontButton = by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Front")]');

	this.nextButton = by.css(".step2"); // .product-prices .green-meadow

	this.product = by.css(".product-list:nth-of-type(1)");
	this.selectProduct = by.css(".product-list:nth-of-type(1) .btn-success");

	this.chooseProductButton = by.css(".menu-left>li:first-child");
	this.clearAll = by.css(".intercom-notifications-dismiss-button");

	this.chooseAProductCategory = function(productCategory) {
		/*
		 * browser.wait(new protractor.until.Condition('some condition',
		 * function () { return
		 * browser.driver.findElement(by.xpath('(.//*[text()="' +
		 * productCategory + '"])[1]')).isDisplayed(); }),
		 * 20000).then(function(){
		 * browser.driver.findElement(by.xpath('(.//*[text()="' +
		 * productCategory + '"])[1]')).click(); })
		 */
		browser.driver.wait(function() {
			return browser.driver.isElementPresent(by.xpath('(.//*[text()="' + productCategory + '"])[1]'));
		}, 20000);
		browser.driver.findElement(by.xpath('(.//*[text()="' + productCategory + '"])[1]')).click();
	};

	this.chooseAProduct = function(product) {
		element(by.css('#mCSB_2_container>div:nth-of-type(1)')).click();
		browser.driver.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
		browser.driver.wait(function() {
			return browser.driver.isElementPresent(by.xpath('.//*[text()="' + product
					+ '"]/following-sibling::div[@class="row"]//button[text()="Select"]'));
		}, 20000);
		browser.driver.findElement(
				by
						.xpath('.//*[text()="' + product
								+ '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).click();
		/*
		 * browser.wait(new protractor.until.Condition('some condition',
		 * function () { return
		 * browser.driver.findElement(by.xpath('.//*[text()="' + product +
		 * '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).isDisplayed();
		 * }), 20000).then(function(){
		 * browser.driver.findElement(by.xpath('.//*[text()="' + product +
		 * '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).click(); })
		 */
	};

	this.chooseProduct = function(product) {
		commonFunctions.click(this.product);
		browser.driver.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
		commonFunctions.click(this.selectProduct);
	};

	this.clickAddTextButton = function() {
		commonFunctions.click(this.addTextButton);
	};

	// ---form
	this.editText = function(text) {
		commonFunctions.sendKeys(this.editTextInput, text);
	};

	this.clickXOnForm = function() {
		commonFunctions.click(this.XOnForm);
	};
	// form---

	this.clickShowBackButton = function() {
		commonFunctions.click(this.showBackButton);
	};

	this.clickShowFrontButton = function() {
		commonFunctions.click(this.showFrontButton);
	};

	this.clickNextButton = function() {
		commonFunctions.click(this.nextButton);
	};

	this.clickChooseProductButton = function() {
		commonFunctions.click(this.chooseProductButton);
	};

	this.clickClearAllButton = function() {
		commonFunctions.click(this.clearAll);
	};
}

module.exports = new designBetaPage();