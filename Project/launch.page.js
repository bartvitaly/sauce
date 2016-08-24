var launchPage = function () {
	this.typeCampaignTitle = function (campaignTitle) {
		browser.driver.findElement(by.xpath(".//*[text()='Campaign Title']/following-sibling::input")).sendKeys(campaignTitle);
	};

	this.typeDescription = function (description) {
		browser.driver.findElement(by.id("campaign_description")).sendKeys(description);
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
		browser.driver.findElement(by.id("uniform-accept_terms")).click();
	};

	this.clickLaunchButton = function() {
		browser.driver.findElement(by.xpath("//*[text()='Launch']/..")).click();		
	};
	

	//Categorize Your Campaign 

};
module.exports = new launchPage();