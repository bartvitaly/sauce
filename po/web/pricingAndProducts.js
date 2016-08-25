var pricingAndProductsPage = function () {
	this.clickAddAdditionalProductsPage = function () {
		browser.driver.findElement(by.css(".btn-add-product")).click();
	}; 

	this.chooseAProductCategory = function (category) {
		browser.driver.findElement(by.xpath(".//*[@class='col-md-3 category-container']//h4[text()='" + category + "']")).click();
	}

	this.chooseAProduct = function (product){
		browser.driver.findElement(by.xpath('.//*[@class="col-md-4"]//*[text()="' + product + '"]/following-sibling::p/button')).click();
	};

	this.clickClose = function () {
		browser.driver.findElement(by.xpath(".//button[text()='Close']")).click();		
	};

	this.chooseColor = function (color) {
		browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
		browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
		browser.driver.findElement(by.xpath(".//*[@id='added_list_products']//*[@title='" + color + "']")).click();
	};

	this.getTitleOfAdditionalProducts = function () {
		//Result table
		var valuesList = [];
		return browser.driver.findElements(by.xpath(".//*[@id='added_list_products']/div//div[@class='panel-heading']/span"))
		.then(function (elements) {
			elements.forEach(function(element,index, elements){
				element.getText().then(function(text){
					valuesList[index] = text;
				});
			});
		})
		.then(function () {
			console.log(valuesList);
			return valuesList;
		});
	};

	this.clickNextButton = function () {
		browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
		browser.driver.actions().sendKeys(protractor.Key.SPACE).perform();
    	browser.driver.findElement(by.css(".custom-form-group .btn.green-meadow.btn-md")).click();
    };
};

module.exports = new pricingAndProductsPage();