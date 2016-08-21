'use strict';

/**
 * This is a configuration file for Sauce Labs
 * 
 * @bartvitaly
 */

exports.config = {

	directConnect : true,

	sauceUser : 'bartvitaly',

	sauceKey : '96fe819c-b6e1-472f-9e98-5793cacb1d62',

	capabilities : {
		'browserName' : 'chrome'
	},

	framework : 'jasmine',
	specs : [ 'test.js' ],

	baseUrl : 'https://release1.viralstyle.com',

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
			browser.manage().deleteAllCookies();
		});
	},

	jasmineNodeOpts : {
		showColors : true,
		defaultTimeoutInterval : 200000,
		getPageTimeout : 200000,
		isVerbose : true,
		includeStackTrace : true,
		allScriptsTimeout : 200000
	}
};
