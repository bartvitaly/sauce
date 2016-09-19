var common = require('../common/common.js');

var timeout = 540000;
exports.config = {

	allScriptsTimeout : timeout,
	directConnect : false,
	capabilities : {
		'browserName' : 'firefox'
	},
	framework : 'jasmine',
	specs : [ '../specs/web/createProduct_e2e.js' ],

	params : {
		user : {
			email : common.getProperty("user.email"),
			password : common.getProperty("user.password")
		},
	},

	baseUrl : common.getProperty("url.test"),

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
			var width = 768;
			var height = 548;
			browser.driver.manage().window().setSize(width, height);
			browser.manage().timeouts().setScriptTimeout(timeout);
			browser.manage().timeouts().pageLoadTimeout(timeout);
			browser.manage().timeouts().implicitlyWait(timeout);
			browser.manage().deleteAllCookies();
		});
	},

	jasmineNodeOpts : {
		isVerbose : true,
		showColors : true,
		includeStackTrace : true,
		defaultTimeoutInterval : timeout * 3
	}
};
