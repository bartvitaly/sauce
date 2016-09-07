var common = require('../../common/common.js');

describe("Smoke test", function() {
	var designBetaPage = require("../../po/web/design.beta.page.js");
	var pricingAndProducts = require("../../po/web/pricingAndProducts.js");
	var loginPage = require("../../po/web/login.page.js");
	var launchPage = require("../../po/web/launch.page.js");
	var productCategory;
	var product;
	var random;

	beforeAll(function() {
		browser.driver.manage().window().maximize();
		browser.driver.get(browser.baseUrl + "/design.beta#designer");
	});

	it("test", function() {
		var products = [ "Unisex Cotton Tee", "Premium Unisex Tee", "Men\'s Polo" ];
		var shortSleeves = new productCategory("Short Sleeves", products);
		products = [ "Unisex Long Sleeve", "Hanes Long Sleeve", "Crew Neck Sweatshirt" ];
		// , "Dry Sport Long-Sleeve"];
		var longSleeves = new productCategory("Long Sleeves", products);
		products = [ "Gildan Hoodie", "Gildan Zip-Up Hoodie" ];
		var hoodies = new productCategory("Hoodies", products);
		products = [ "Women\'s Crew Tee" ];
		var ladiesTees = new productCategory("Ladies Tees", products);
		products = [ "Men\'s Tank Top", "Women\'s Spaghetti Tank" ];
		/*
		 * ,"Women\'s Tank Top", "Women\'s Tank Top", "Women\'s Flowy Tank",
		 * "Reversible Mesh Tank"];
		 */
		 var tankTops = new productCategory("Tank Tops", products);
		 products = [ "Mens V-Neck", "Women\'s V-Neck" ];
		 var vNecks = new productCategory("V-Necks", products);
		 products = [ "Coffee Mug", "Color Coffee Mug" ];
		 var mugs = new productCategory("Mugs", products);
		 products = [ "Gildan Kids" ];
		 var kids = new productCategory("Kids", products);
		 products = [ "Sublimation Tee", "Sublimation Tank", "Flip Flops White" ]
		// "Flip Flops Black",
		// "8\" Round Wall Clock",
		// "Laptop Sleeve"];
		var allOverPrint = new productCategory("All-Over Print", products);
		products = [ "Phone Cases" ];
		var phoneCases = new productCategory("Phone Cases", products);
		products = [ "6-Panel Classic Snapback" ];
		var hats = new productCategory("Hats", products);
		products = [ "Circle Necklace", "Square Necklace", "Rectangle Necklace" ];
		// , "Dog Tag"];
		var jewelry = new productCategory("Jewelry", products);

		var productCategories;

		var productCategoriesWithAdditionalProducts = [ shortSleeves ];// ladiesTees,shortSleeves,
		// longSleeves

		var productCategoriesWithoutAdditionalProducts = [ mugs, allOverPrint, jewelry ];// hats,hoodies,vNecks,kids

		var additionalProductCategories = [ shortSleeves, longSleeves, ladiesTees, tankTops, vNecks ];

		// random = Math.random() >= 0.5;
		random = true;
		if (random) {
			productCategories = productCategoriesWithAdditionalProducts;
		} else {
			productCategories = productCategoriesWithoutAdditionalProducts;
		}

		// delete category that is in use.
		var underscore = require("./underscore.js");
		var shuffledProductCategories = underscore.shuffle(productCategories);
		var shuffledProducts = underscore.shuffle(shuffledProductCategories[0].products);
		productCategory = shuffledProductCategories[0];
		product = "Unisex Cotton Tee";// shuffledProducts[0];
		// shuffle productCategories
		console.log("productCategory: " + productCategory.category);

		for (var i = 0; i < additionalProductCategories.length; i++)
			if (additionalProductCategories[i] === productCategory) {
				additionalProductCategories.splice(i, 1);
				break;
			}
			var shuffledAdditionalCategory = underscore.shuffle(additionalProductCategories);
		additionalCategory = vNecks// shuffledAdditionalCategory[0];
		additionalProduct = additionalCategory.products[0];
		console.log("additionalCategory: " + additionalCategory.category);
		console.log("additionalProduct: " + additionalProduct);

	});

	it("Choose a product category", function() {
		console.log('product category ' + productCategory.category);
		designBetaPage.chooseAProductCategory(productCategory.category);

	});

	it("Choose a product ", function() {
		console.log('choose a product ');
		browser.actions().mouseDown(element(by.xpath(".//*[@id='mCSB_2_dragger_vertical']/div"))).perform();
		browser.actions().mouseMove({x:0, y:100}).perform();
		browser.actions().mouseUp().perform();
		//browser.sleep(4000);

		designBetaPage.chooseProduct();

	});

	it("Add Additional products", function() {
		console.log('click add text button');
		designBetaPage.clickAddTextButton();

		designBetaPage.clickNextButton();
		pricingAndProducts.clickNextButton();
	});

	it("login", function() {
		// login
		loginPage.login(browser.params.user.email, browser.params.user.password);

		pricingAndProducts.clickNextButton();
	});

	it("check launch", function() {

		launchPage.typeCampaignTitle(Math.floor(Date.now() / 1000));
		launchPage.typeDescription(Math.floor(Date.now() / 1000));

		// Save a product url to a file
		launchPage.getURL().then(function(url) {
			common.saveProductUrl(url);
		});

		launchPage.clickAcceptTermsCheckBox();
		browser.sleep(4000);
		launchPage.clickLaunchButton();
		browser.sleep(40000);

	});

	function productCategory(category, products) {
		this.category = category;
		this.products = products;
	}
	;

});