'use strict';

/**
 * This class describes a home page
 * 
 * @bartvitaly
 */

var fbPage = function() {

//	this.fbPrefix = 'com.facebook.katana:id/';
	this.fbPrefix = 'com.facebook.lite:id/';
	
//	this.username = by.id(this.fbPrefix + 'login_username');
	this.username = by.id(this.fbPrefix + 'inline_textbox_edittext');
	
//	this.password = by.id(this.fbPrefix + 'login_password');
//	this.loginButton = by.id(this.fbPrefix + 'login_login');

	/*
	 * Methods
	 */

	this.login = function(user) {
		element(this.username).clear();
		element(this.username).sendKeys(user.phone);
//		element(this.password).sendKeys(user.password);
//		element(this.loginButton).click();
	};
};

module.exports = new fbPage();
