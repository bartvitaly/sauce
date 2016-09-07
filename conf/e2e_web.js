var timeout = 180000;
exports.config = {

	allScriptsTimeout : timeout,
	directConnect : false,
	capabilities : {
		'browserName' : 'firefox'
	},
	framework : 'jasmine',
	specs : [ // '../specs/web/smoke.spec.js'
	'../specs/web/createProduct_e2e.js' ],

	params : {
		prodUrl : 'https://viralstyle.com',
		upsellProduct : '',

		propertiesFile : 'properties.txt',

		user : {
			firstName : 'FName',
			lastName : 'LName',
			// email : 'morozov_vadim@meta.ua', // live
			// email : 'user1470859622821@mailinator.com', // prod2
			email : 'user1472879445463@mailinator.com', // release1, release2
			// password : 'qwertyuiop' // live
			password : 'strange!' // prod2, release1, release2
		},
	},

	baseUrl : 'https://release1.viralstyle.com', // https://release1.viralstyle.com,
													// 52.40.217.139

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
			browser.manage().window().maximize();
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
