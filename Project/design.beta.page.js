var designBetaPage = function () {
	this.chooseAProductCategory = function(productCategory){
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.xpath('(.//*[text()="' + productCategory + '"])[1]'));
		}, 20000);
		browser.driver.findElement(by.xpath('(.//*[text()="' + productCategory + '"])[1]')).click();
	};

	this.chooseAProduct = function(product){
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.xpath('.//*[text()="' + product + '"]/following-sibling::div[@class="row"]//button[text()="Select"]'));
		}, 20000);
		browser.driver.findElement(by.xpath('.//*[text()="' + product + '"]/following-sibling::div[@class="row"]//button[text()="Select"]')).click();
	};

	this.clickAddTextButton = function (){
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.css('.add_item_text'));
		}, 20000);
		browser.driver.findElement(by.css('.add_item_text')).click();
	};

	//---form
	this.editText = function (text) {
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.css('.form-control.text-update'));
		}, 20000);
		browser.driver.findElement(by.css('.form-control.text-update')).clear();
		browser.driver.findElement(by.css('.form-control.text-update')).sendKeys(text);
	};


	this.clickXOnForm = function () {
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(by.css('.glyphicons.remove_2.glyphicons-12.pull-right'));
		}, 20000);
		browser.driver.findElement(by.css('.glyphicons.remove_2.glyphicons-12.pull-right')).click();
	};
    //form---

    this.clickShowBackButton = function () {
    	browser.driver.wait(function () {
    		return browser.driver.isElementPresent(by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Back")]'));
    	}, 20000);
    	browser.driver.findElement(by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Back")]')).click();
    };

    this.clickShowFrontButton = function () {
    	browser.driver.wait(function () {
    		return browser.driver.isElementPresent(by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Front")]'));
    	}, 20000);
    	browser.driver.findElement(by.xpath('.//*[@class="box-thumb btn-show-back pull-left"]/span[contains(text(),"Front")]')).click();
    };

    this.clickNextButton = function () {
/*    	browser.sleep(3000);
    	browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
    	browser.sleep(3000);
		browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
		browser.sleep(3000);*/
    	browser.driver.findElement(by.xpath(".//*[@class='align-center']//*[@class='btn green-meadow btn-md']")).click();
    	/*browser.driver.findElement(by.xpath(".//*[@id='products']//*[@class='btn green-meadow btn-md']")).click();*/


    };

    this.clickChooseProductButton = function () {
    	browser.driver.findElement(by.xpath(".//a[contains(text(),'Choose Product')]")).click(); 
    };
}

module.exports = new designBetaPage();