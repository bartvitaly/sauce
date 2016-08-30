/**
 * This class describes a shipping information object
 * 
 * @bartvitaly
 */

var random = Date.now();

var shipping = function(user) {

	this.email = user.email;

	// Shipping information
	this.firstName = user.firstName;
	this.lastName = user.lastName;
	this.address = 'address';
	this.aptSuite = 'app. 1';
	this.city = 'city';
	this.state = 'Florida (FL)';
	this.zipCode = '123';
	this.country = 'Austria';
	this.countryShort = 'AT';
	this.phone = user.phone;

	// Payment information
	this.cardNumber = '5555555555554444';
	this.expMonth = '1';
	this.expYear = '2019';
	this.cvv = '111';

};

module.exports = shipping;