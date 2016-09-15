/**
 * This class describes a user object
 * 
 * @bartvitaly
 */

var random = Date.now();

var common = require('../common/common.js');

var user = function() {
	this.firstName = 'FName';
	this.lastName = 'LName';
	this.publicName = 'user' + random;
	this.email = 'user' + random + '@mailinator.com';
	this.phone = random;
	this.password = common.getProperty("user.password");

	// console.log('A test user is prepared: ' + this.firstName + ' '
	// + this.lastName + ', email: ' + this.email + ', password: '
	// + this.password);
};

module.exports = new user();