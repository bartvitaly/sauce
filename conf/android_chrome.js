'use strict';

/**
 * This is a configuration file for Android
 * 
 * @bartvitaly
 */

var common = require('../common/common.js');

var timeout = 120000;

exports.config = {

	capabilities : {
		'newCommandTimeout' : timeout / 1000,
		'browserName' : 'Browser',
		'deviceName' : 'nexus3_x86',
		'platformName' : 'Android',
		'platformVersion' : '5.1.1',
		'udid' : 'emulator-5554',
		'autoWebview' : true,
		'autoWebviewTimeout' : timeout
	},

	seleniumAddress : 'http://localhost:4723/wd/hub',

	allScriptsTimeout : timeout,

	specs : [ '../specs/mobile/checkout_coupon.js' ],

	baseUrl : common.getProperty("url.test"),

	params : {
		order : {
			size : 'S',
			quantity : '1',
			name : ''
		},
	},

	frameworks : 'jasmine2',

	onPrepare : function() {
		var mkdirp = require('mkdirp');
		var newFolder = "./reports/" + Date.now()
				+ __filename.replace('.js', '').replace(__dirname + require('path').sep, '_');

		var jasmineReporters = require('jasmine-reporters');
		return browser.getProcessedConfig().then(function(config) {
			mkdirp(newFolder);
			jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
				savePath : newFolder,
				consolidateAll : true
			}));
			browser.ignoreSynchronization = true;
			browser.manage().timeouts().setScriptTimeout(timeout);
			browser.manage().timeouts().pageLoadTimeout(timeout);
			browser.manage().timeouts().implicitlyWait(timeout);
			browser.manage().deleteAllCookies();
		});
	},

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts : {
		isVerbose : true,
		showColors : true,
		includeStackTrace : true,
		defaultTimeoutInterval : timeout * 3
	}

};