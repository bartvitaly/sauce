'use strict';

/**
 * This is a facebook login test
 * 
 * @bartvitaly
 */

var fbPage = require('../po/mobile/fb.js');
var userItem = require('../items/user.js');

describe('login', function() {

	var fbpage = new fbPage();
	var user = new userItem();
	user.phone = '+447491509913';
	user.password = 'Hd8675Fghr';

	it('1', function() {
		console.log('Open login page');
		fbpage.login(user);
	});

});
