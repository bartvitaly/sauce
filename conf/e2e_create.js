var common = require('../common/common.js');

var timeout = 120000;
exports.config = {

	allScriptsTimeout : timeout,
	directConnect : false,
	capabilities : {
		'browserName' : 'firefox'
	},
	framework : 'jasmine',
	specs : [ '../specs/web/createProductWithUpsell.js' ],

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
