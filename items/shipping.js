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
	this.stateShort = 'FL';
	this.zipCode = '12345';
	this.country = 'Austria';
	this.countryShort = 'AT';
	this.phone = user.phone;

	// Payment information
	this.cardNumber = '5555555555554444';
	this.expMonth = '1';
	this.expYear = '2019';
	this.cvv = '111';

	this.paypal = function() {
		this.firstName = "Viralstyle";
		this.lastName = "Tester";
		this.address = '1 Main St';
		this.aptSuite = '';
		this.city = 'San Jose';
		this.state = 'CA';
		this.stateShort = 'CA';
		this.zipCode = '95131';
		this.country = '';
		this.countryShort = '';
	};

};

module.exports = shipping;