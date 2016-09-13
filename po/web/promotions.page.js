var commonFunctions = require('../../common/commonWeb.js');
var common = require('../../common/common.js');
var promotionsPage = function () {
	this.addCouponButton = by.css(".btn-sm.bg-green-meadow");
	this.codeInput = by.id("code");
	this.descriptionInput = by.id("description");
	this.discountInput = by.id("discount");
	this.discountDropDown = by.css("[name='discount_type']");
	this.percentageDiscount = by.css("[name='discount_type']>option[value='PERCENTAGE']");
	this.restrictionDropDown = by.id("restriction_type");
	this.allCampaignsRestriction = by.css("#restriction_type>option[value='PUBLIC_NAME']");
	this.expiryDatePicker = by.css(".date-picker");
	this.sixInDatePicker = by.css(".first  [data-title='r1c2']");
	this.submitButton = by.css(".btn-add-coupon");
	this.onOffSelector = by.css(".bootstrap-switch-container:nth-of-type(1)");

	
	this.addCoupon = function () {
		commonFunctions.click(this.addCouponButton);
		this.fillPromotionsForm();
		commonFunctions.click(this.submitButton);
		commonFunctions.click(this.onOffSelector);
	};

	this.fillPromotionsForm = function (discountType, restrictionType) {
		var code = Math.floor(Date.now() / 1000);
		commonFunctions.sendKeys(this.codeInput, code);
		commonFunctions.sendKeys(this.descriptionInput, code);
		this.selectExpiryDate();
		commonFunctions.sendKeys(this.discountInput, "3");
		commonFunctions.click(this.discountDropDown);
		element(this.percentageDiscount).click();
		this.clickEnter();
		commonFunctions.click(this.restrictionDropDown);
		commonFunctions.click(this.allCampaignsRestriction);
		this.clickEnter();
		commonFunctions.click(this.submitButton);
		browser.sleep(5000);
		commonFunctions.click(this.onOffSelector);
		common.setProperty("coupon.code", code);
	};

	this.clickEnter = function() {
		browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
	}

	this.clickOnOffSelector = function() {
		commonFunctions.click(this.onOffSelector);
	};

	this.selectExpiryDate = function() {
		commonFunctions.click(this.expiryDatePicker);
		commonFunctions.click(this.sixInDatePicker);

		//FINISHED THERE
	};
};
module.exports = new promotionsPage();