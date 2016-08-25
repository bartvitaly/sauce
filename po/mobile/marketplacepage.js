'use strict';

/**
 * This class describes Marketplace page
 * 
 * @bartvitaly
 */

var common = require('../../common/common.js');

var marketplacePage = function() {

	this.url = '/marketplace';

	// Search field
	this.searchMarketplace = by.css("[ng-model='market.search']");

	// Product list
	this.items = ".product-list .ng-scope";
	this.image = "img";
	this.name = ".title";
	this.price = ".price";

	/*
	 * Methods
	 */

	// search for a product
	this.searchProduct = function(title) {
		common.sendKeys(this.searchMarketplace, title);
		common.clickEnter();
	};

	this.openProduct = function(index) {
		index = index + 1;
		var item = this.items + ":nth-of-type(" + index + ")";
		common.click(by.css(item + ' ' + this.image));
	}

};

module.exports = new marketplacePage();