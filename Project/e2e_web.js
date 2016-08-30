exports.config = {
	directConnect : true,
	capabilities : {
		'browserName' : 'firefox'
	},
	framework : 'jasmine',
	specs : [ 'smoke.spec.js' ],

	params : {
		prodUrl : 'https://viralstyle.com',

		propertiesFile : 'properties.txt',

		user : {
			firstName : 'user1470859622821',
			lastName : 'user1470859622821',
			// email : 'morozov_vadim@meta.ua', // live
			// email : 'user1470859622821@mailinator.com', // prod2
			email : 'user1468255815672@mailinator.com', // release1, release2
			// password : 'qwertyuiop' // live
			password : 'strange!' // prod2, release1, release2
		},
	},

	baseUrl : 'http://release1.viralstyle.com', //https://release1.viralstyle.com, 52.40.217.139

	onPrepare : function() {
		var mkdirp = require('mkdirp');
		var newFolder = "./reports/" + Date.now() + __filename.replace('.js', '').replace(__dirname + require('path').sep, '_');

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
		getPageTimeout : 20000,
		isVerbose : true,
		includeStackTrace : true,
		allScriptsTimeout : 20000
	}
};
