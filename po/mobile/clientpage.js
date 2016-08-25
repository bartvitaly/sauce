'use strict';

/**
 * This class describes a home page
 * 
 * @bartvitaly
 */

var commonFunctions = require('../../common/common.js');

var clientPage = function() {

	this.url = '/client/home';
	
	// Menu controls
	this.menu = by.css("[ng-click='header.toggleMenu()']");
	this.clientMenu = by.css(".menu-toggler");

	// Profile dropdown
	this.pageLogo = by.css(".page-logo");
	this.profileDropdown = by.css(".img-circle");
	this.logoutDropdown = by.css("[href*='logout'] i");

	// Popups
	this.welcome = by.css("img.intercom-small-announcement-avatar");
	this.welcomeClose = by.css(".intercom-sheet-header-close-button div");

	/*
	 * Methods
	 */

	// This method logs out a client
	this.logout = function() {
		commonFunctions.click(this.profileDropdown);
		commonFunctions.click(this.logoutDropdown);
	};
};

module.exports = new clientPage();