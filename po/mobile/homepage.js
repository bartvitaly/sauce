'use strict';

/**
 * This class describes a home page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var homePage = function() {

	this.url = '/client/home';
	
	this.menu = by.css("[ng-click='header.toggleMenu()']");

	// Menu items
	this.shop = by.css(".navbar-header-menu [href='/marketplace']");
	this.create = by.css(".navbar-header-menu [href='/design.beta']");
	this.sell = by.css(".navbar-header-menu [href='/open-shop']");
	this.login = by.css(".navbar-header-menu [ng-click*='Login']");
	// this.logout = by.xpath("//div[@class='navbar-header-menu']//li[5]/a");
	this.logout = by.css(".navbar-header-menu [ng-click*='logout']");
	this.signup = by.css(".navbar-header-menu [ng-click*='Register']");

	// Popups
	this.welcome = by.css("img.intercom-small-announcement-avatar");
	this.welcomeClose = by.css(".intercom-sheet-header-close-button div");

	/*
	 * Methods
	 */

	// open signup page
	this.openSignUp = function() {
		commonFunctions.click(this.menu);
		commonFunctions.click(this.signup);
	};

	// open login page
	this.openLogin = function() {
		commonFunctions.click(this.menu);
		commonFunctions.click(this.login);
	};

	// open product page
	this.openProduct = function(url) {
		browser.get(url);
	};

	// log out
	this.logout = function() {
		// browser.get(browser.baseUrl + '/logout/');
		// browser.waitForAngular();
		commonFunctions.click(this.menu);
		commonFunctions.click(this.logout);
	};
};

module.exports = new homePage();
