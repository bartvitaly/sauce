'use strict';

/**
 * This is a configuration file for Android
 * 
 * @bartvitaly
 */

var timeout = 20000;

exports.config = {
	seleniumAddress : 'http://localhost:4723/wd/hub',

	specs : [ '../specs/test.js' ],

	allScriptsTimeout : timeout,

	capabilities : {
		'newCommandTimeout' : timeout / 1000,
		'browserName' : '',
		'deviceName' : 'nexus_3_x86',
		'udid' : 'emulator-5554', // 192.168.22.101:5555
		'platformName' : 'Android',
		'platformVersion' : '5.1.1',
		'autoWebview' : true,
		'autoWebviewTimeout' : timeout,
		// fullReset : true,
		// 'app' :
		// 'C:/work/com.viralstyle/apk/com.facebook.katana_86.0.0.0.28-33340150_minAPI15(armeabi-v7a)(nodpi)_apkmirror.com.apk'
		'app' : 'C:/work/com.viralstyle/apk/flite.apk',
		// 'appPackage' : 'com.facebook.lite-2.apk',
		'appActivity' : 'com.facebook.lite.MainActivity',
	// 'autoInstrument' : true
	},

	allScriptsTimeout : timeout,

	// baseUrl : 'http://10.0.2.2:8000',
	baseUrl : 'https://release2.viralstyle.com',

	frameworks : 'jasmine2',

	onPrepare : function() {
		// browser.driver.context('NATIVE_APP');
		browser.driver.get(browser.baseUrl);
		var wd = require('wd'), protractor = require('protractor'), wdBridge = require('wd-bridge')(protractor, wd);
		wdBridge.initFromProtractor(exports.config);
	},

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts : {
		isVerbose : true,
		showColors : true,
		includeStackTrace : true,
		defaultTimeoutInterval : timeout
	}

};