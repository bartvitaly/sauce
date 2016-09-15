var common = require('../../common/common.js');
var loginPage = require("../../po/web/login.page.js");
var promotionsPage = require("../../po/web/promotions.page.js");

describe("Coupon.", function(){

	beforeAll(function() {
		browser.driver.manage().window().maximize();
		browser.driver.get(browser.baseUrl + "/client/promotions");
		loginPage.login(browser.params.user.email, browser.params.user.password);
	});



	it("Add.", function(){
		promotionsPage.addCoupon("Percentage", "All campaigns");
	})
})