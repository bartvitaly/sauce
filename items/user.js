/**
 * This class describes a user object
 * 
 * @bartvitaly
 */

var random = Date.now();

var user = function() {
	this.firstName = 'FName';// + random;
	this.lastName = 'LName';// + random;
	this.publicName = 'user' + random;
	this.email = 'user' + random + '@mailinator.com';
	this.phone = random;
	this.password = 'strange!';

//	console.log('A test user is prepared: ' + this.firstName + ' '
//			+ this.lastName + ', email: ' + this.email + ', password: '
//			+ this.password);
};

module.exports = new user();