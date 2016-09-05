var commonFunctions = require('../../common/commonWeb.js');

var launchPage = function () {

	this.campaignTitleInput = by.xpath(".//*[text()='Campaign Title']/following-sibling::input");
	this.descriptionInput = by.id("campaign_description");
	this.acceptTermsCheckBox = by.id("uniform-accept_terms");
	this.launchButton = by.xpath("//*[text()='Launch']/..");
	this.addUpsellButton = by.css(".btn.btn-md.bg-green-meadow.pull-left.margin-bottom-15.margin-right-10");
	this.addButton = by.xpath("(.//*[@class='btn btn-sm bg-green-meadow upsell-pixel-btn'])[1]");
	this.compaignNameInSearch = by.css(".modal-body .col-md-12 .form-control");
	this.searchButton = by.css(".modal-body .col-md-12 .btn-success");


	this.typeCampaignTitle = function (campaignTitle) {
		commonFunctions.sendKeys(this.campaignTitleInput, campaignTitle);
		//browser.driver.findElement(by.xpath(".//*[text()='Campaign Title']/following-sibling::input")).sendKeys(campaignTitle);
	};

	this.typeDescription = function (description) {
		commonFunctions.sendKeys(this.descriptionInput, description);
		//browser.driver.findElement(by.id("campaign_description")).sendKeys(description);
	};

	this.getURL = function (){
		var urlFirstPart;
		browser.driver.findElement(by.xpath(".//*[text()='URL']/following-sibling::div/span"))
		.getText().then(function(url){
			urlFirstPart = url;
		});
		return browser.driver.findElement(by.xpath(".//*[text()='URL']/following-sibling::div/input")).
		getAttribute("value").then(function(product){
			console.log("url + product: " + urlFirstPart + product);
			browser.params.productURL = urlFirstPart + product;
			return urlFirstPart + product;
		})
	
	};

	this.clickAcceptTermsCheckBox = function () {
		commonFunctions.click(this.acceptTermsCheckBox);
		//browser.driver.findElement(by.id("uniform-accept_terms")).click();
	};

	this.clickLaunchButton = function() {
		commonFunctions.click(this.launchButton);		
		/*browser.driver.findElement(by.xpath("//*[text()='Launch']/..")).click();*/		
	};
	//Upsell
	this.clickAddUpsellButton = function () {
		commonFunctions.click(this.addUpsellButton);		
		/*browser.driver.findElement(by.css(".btn.btn-md.bg-green-meadow.pull-left.margin-bottom-15.margin-right-10")).click();*/
	};

	this.clickAddButton = function () {
		commonFunctions.click(this.addButton);
		//browser.driver.findElement(by.xpath("(.//*[@class='btn btn-sm bg-green-meadow upsell-pixel-btn'])[1]")).click();
	};

	this.isUpsellBlockVisivle = function () {
		return browser.driver.findElement(by.id("upsell-well-contents")).isDisplayed();
	};

	this.typeCompaignNameInSearch = function(compaignName) {
		commonFunctions.sendKeys(this.compaignNameInSearch,compaignName);
		
		//browser.driver.findElement(by.css(".modal-body .col-md-12 .form-control")).sendKeys(compaignName);
	};

	this.clickSearchButton = function() {
		commonFunctions.click(this.searchButton);
		
		//browser.driver.findElement(by.css(".modal-body .col-md-12 .btn-success")).click();
	};
	

	//Categorize Your Campaign 

};
module.exports = new launchPage();