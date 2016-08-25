'use strict';

/**
 * This class describes a track order page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var trackOrderPage = function() {

	this.url = '/track-order';

	this.title = by.css("h2");

	// Validation errors
	this.errorsArrayFull = [ 'Please enter your order number.',
			'Please enter your zip code.' ];

	this.errors = by.css(".help-block:not(.ng-hide):not(.ng-binding)");

	this.vsOrderNumber = by.css("[id='order_num_input']");
	this.zipCode = by.css("[id='zip_code_input']");
	this.trackOrder = by.css("[state*='trackOrder']");

	/*
	 * Methods
	 */

	// checks front image
	this.track = function(orderNumber, zipCode) {
		commonFunctions.sendKeys(this.vsOrderNumber, orderNumber);
		commonFunctions.sendKeys(this.zipCode, zipCode);
		commonFunctions.click(this.trackOrder);
	};

};

module.exports = new trackOrderPage();