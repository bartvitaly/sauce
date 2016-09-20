var commonFunctions = require('../../common/commonWeb.js');

var designBetaPage = function () {
	this.shortSleevesCategory = by.xpath("(.//*[text()='Short Sleeves'])[1]");
	this.unisexCottonTeeProduct = by.xpath(".//*[text()='Unisex Cotton Tee']/following-sibling::div[@class='row']//button[text()='Select']");

	this.addAtworkButton = by.css(".glyphicons.picture");
	this.firstAtworkInTable = by.xpath("(.//*[@class='row clearfix']//img)[1]");
	this.addTextButton = by.css(".glyphicons.text_bigger");
	this.editTextInput = by.css('.form-control.text-update');
	this.XOnForm = by.css('.glyphicons.remove_2.glyphicons-12.pull-right');
	this.showBackButton = by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Back")]');
	this.showFrontButton = by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Front")]');
	this.nextButton = by.xpath(".//*[@class='align-center']//*[@class='btn green-meadow btn-md']");
	this.chooseProductButton = by.css(".menu-left>li:first-child");
	this.clearAll = by.css(".intercom-notifications-dismiss-button");

	this.chooseAProductCategory = function(productCategory){
/*		browser.wait(new protractor.until.Condition('some condition', function () {
			return browser.driver.findElement(by.xpath('(.//*[text()="' + productCategory + '"])[1]')).isDisplayed();
		}), 20000).then(function(){
			browser.driver.findElement(by.xpath('(.//*[text()="' + productCategory + '"])[1]')).click();
		})*/
/*		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.xpath('(.//*[text()="' + productCategory + '"])[1]'));
		}, 20000);
		browser.driver.findElement(by.xpath('(.//*[text()="' + productCategory + '"])[1]')).click();*/
	commonFunctions.click(this.shortSleevesCategory);
	};

	this.chooseAProduct = function(product){
		
		commonFunctions.click(this.unisexCottonTeeProduct);
/*		element(by.css('#mCSB_2_container>div:nth-of-type(1)')).click();
		browser.driver.actions().sendKeys(protractor.Key.PAGE_DOWN).perform();
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.xpath('.//*[text()="' + product + '"]/following-sibling::div[@class="row"]//button[text()="Select"]'));
		}, 20000);
		browser.driver.findElement(by.xpath('.//*[text()="' + product + '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).click();*/
/*		browser.wait(new protractor.until.Condition('some condition', function () {
			return browser.driver.findElement(by.xpath('.//*[text()="' + product + '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).isDisplayed();
		}), 20000).then(function(){
			browser.driver.findElement(by.xpath('.//*[text()="' + product + '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).click();
		})*/
	};

	this.clickAddTextButton = function (){
		commonFunctions.click(this.addTextButton);
	};

	//---form
	this.editText = function (text) {
		commonFunctions.sendKeys(this.editTextInput, text);
	};

	this.clickXOnForm = function () {
		commonFunctions.click(this.XOnForm);
	};
    //form---

    this.clickShowBackButton = function () {
    	commonFunctions.click(this.showBackButton);    	
    };

    this.clickShowFrontButton = function () {
    	commonFunctions.click(this.showFrontButton);
    };

    this.clickNextButton = function () {
    	commonFunctions.click(this.nextButton);    	
    };

    this.clickChooseProductButton = function () {    	
    	commonFunctions.click(this.chooseProductButton);
    };

    this.clickClearAllButton  = function() {
    	commonFunctions.click(this.clearAll);
    };

    this.addAtwork = function() {
    	commonFunctions.click(this.addAtworkButton);
    	commonFunctions.click(this.firstAtworkInTable);
    };
}

module.exports = new designBetaPage();