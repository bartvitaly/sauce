'use strict';

/**
 * This is a configuration file for Android
 * 
 * @bartvitaly
 */

var timeout = 300000;

exports.config = {

	capabilities : {
		'newCommandTimeout' : timeout / 1000,
		'browserName' : 'Browser',
		'deviceName' : 'test',
		'platformName' : 'Android',
		'platformVersion' : '5.1.1',
		'udid' : 'emulator-5554'
	},

	seleniumAddress : 'http://localhost:4723/wd/hub',

	allScriptsTimeout : timeout,

	specs : [ '../specs/mobile/signup.js' ],

	baseUrl : 'https://release1.viralstyle.com',

	params : {
		prodUrl : 'https://viralstyle.com',

		propertiesFile : 'properties.txt',

		paypalEmail : 'qa-paypal@viralstyle.com',
		paypalPassword : '12345678',

		user : {
			firstName : 'FName',
			lastName : 'LName',
			email : 'user1472879445463@mailinator.com', // release1, release2
			password : 'strange!'
		},
		order : {
			productUrl : '/user1468255815672/1470940818', // 1471041994
			// 1470940818
			size : 'S',
			quantity : '1',
			name : ''
		},
		coupon : {
			code : 'discount_3',
			value : 0.03
		},
		upsell : {
			productUrl : '/user1468255815672/product3',
			discount : 0.05
		}
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