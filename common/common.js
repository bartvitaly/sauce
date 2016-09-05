'use strict';

/**
 * This is a class fore common functions
 * 
 * @bartvitaly
 */

var commonFunctions = function() {

	/**
	 * 
	 * Protractor specific functions
	 * 
	 */

	// check if an element is displayed on the page
	this.isDisplayed = function(elementBy) {
		var item = protractor.promise.defer();
		browser.wait(function() {
			return element(elementBy).isDisplayed().then(function(value) {
				var result = value !== false;
				if (result) {
					item.fulfill(value);
				}
				return result;
			});
		});
		return item.promise;
	};

	// check if an element is present on the page, waits 2 secs
	this.isPresent = function(elementBy) {
		var item = protractor.promise.defer();
		browser.manage().timeouts().implicitlyWait(500);
		browser.wait(function() {
			return element(elementBy).isDisplayed().then(function(value) {
				var result = value !== false;
				if (result) {
					item.fulfill(value);
				}
				return result;
			});
		});
		browser.manage().timeouts().implicitlyWait(browser.allScriptsTimeout);
		return item.promise;
	};

	// click on the element
	this.click = function(elementBy) {
		browser.driver.wait(this.isDisplayed(elementBy));
		element(elementBy).isDisplayed().then(function(value) {
			expect(value).toBe(true);
			browser.manage().timeouts().implicitlyWait(2000);
			var loading = by.css(".loading:not(.ng-hide)");
			browser.wait(function() {
				return browser.isElementPresent(loading).then(function(presenceOfElement) {
					return !presenceOfElement
				});
			}, 5000);
			browser.manage().timeouts().implicitlyWait(browser.allScriptsTimeout);

			console.log('Clicking element: ' + elementBy);
			try {
				element(elementBy).click();
			} catch (e) {
				browser.driver.sleep(1000);
				element(elementBy).click();
			}
		});
	};

	// type text to an input/text field
	this.sendKeys = function(elementBy, text) {
		browser.driver.wait(this.isDisplayed(elementBy));
		element(elementBy).isDisplayed().then(function(value) {
			expect(value).toBe(true);
			console.log('Typing text: \'' + text + '\', into field: ' + elementBy);
			element(elementBy).clear();
			element(elementBy).sendKeys(text);
		});
	};

	// click Enter button
	this.clickEnter = function() {
		browser.driver.actions().sendKeys(protractor.Key.ENTER).perform();
	}

	// get attribute of an element
	this.getAttribute = function(elementBy, attribute) {
		var item = protractor.promise.defer();
		browser.wait(function() {
			return element(elementBy).getAttribute(attribute).then(function(value) {
				console.log('Getting attribute... ' + value);
				var result = value !== '';
				if (result) {
					item.fulfill(value);
				}
				return result;
			});
		});
		return item.promise;
	}

	// check if an attribute of an element has expected value
	this.checkAttribute = function(elementBy, attribute, value, contains) {
		var attributeActual = this.getAttribute(elementBy, attribute).then(function(attributeActual) {
			console.log('Checking attribute. Expected: ' + value + ' and actual: ' + attributeActual);
			if (contains) {
				expect(attributeActual).toContain(value);
			} else {
				expect(attributeActual).toEqual(value);
			}
		});
	};

	// returns text promise of an element
	this.getTextPromise = function(elementBy) {
		browser.driver.wait(this.isDisplayed(elementBy));
		var item = protractor.promise.defer();
		browser.wait(function() {
			return element(elementBy).getText().then(function(value) {
				expect(value).not.toBe(null);
				var result = value !== '' && value !== null;
				if (result) {
					item.fulfill(value);
				}
				return result;
			});
		});
		return item.promise;
	}

	// returns text promise of an element
	this.getTextPromiseElement = function(element) {
		var item = protractor.promise.defer();
		browser.wait(function() {
			return element.getText().then(function(value) {
				expect(value).not.toBe(null);
				var result = value !== '' && value !== null;
				if (result) {
					item.fulfill(value);
				}
				return result;
			});
		});
		return item.promise;
	}

	// get text
	this.getText = function(elementBy) {
		return this.getTextPromise(elementBy).then(function(value) {
			return value;
		});
	};

	// get float number
	this.getNumber = function(elementBy) {
		return this.getTextPromise(elementBy).then(function(value) {
			return value.replace(/^\D+|\D+$/g, "");
		});
	};

	// calculate discount
	this.calculateDiscount = function(price, couponValue) {
		return this.round(price * couponValue, 2);
	};

	// check number with percentage precision
	this.checkNumberPrecision = function(expected, actual, precision) {
		var difference = expected - actual;
		console.log('\nChecking numbers with precision ' + precision + '.\nExpected:\n\'' + expected
				+ '\'\nActual:\n\'' + actual + '\'');
		expect(Math.abs(difference) < precision).toBe(true);
	};

	// ceil with precision
	this.ceil = function(number, precision) {
		var factor = Math.pow(10, precision);
		var tempNumber = number * factor;
		var roundedTempNumber = Math.ceil(tempNumber);
		return roundedTempNumber / factor;
	};

	// round with precision
	this.round = function(number, precision) {
		var factor = Math.pow(10, precision);
		var tempNumber = number * factor;
		var roundedTempNumber = Math.round(tempNumber);
		return roundedTempNumber / factor;
	};

	// check if an attribute of an element has expected value
	this.checkText = function(elementBy, value, contains, ignorecase) {
		browser.driver.wait(this.isDisplayed(elementBy));
		element(elementBy).isDisplayed().then(function(isPresent) {
			expect(isPresent).toBe(true);
			var commonfunctions = new commonFunctions();
			var textActual = commonfunctions.getTextPromise(elementBy).then(function(textActualPromise) {
				console.log('\nChecking text.\nExpected:\n\'' + value + '\'\nActual:\n\'' + textActualPromise + '\'');
				if (ignorecase) {
					textActualPromise = textActualPromise.toLowerCase();
					value = value.toLowerCase();
				}
				if (contains) {
					expect(textActualPromise).toContain("" + value);
				} else {
					expect(textActualPromise).toEqual("" + value);
				}
			});
		});
	};

	// check if an attribute of an element has expected value
	this.checkTextArray = function(elements, values, contains, additionalText) {
		if (elements.length != values.length) {
			console.log('Number of elements: ' + elements.length + ', is not equal to number of values expected: '
					+ values.length);
			return false;
		}
		var i = 0;
		for (var i = 0; i < elements.lebgth; ++i) {
			console.log('Checking')
			this.isDisplayed(elements[i]);
			this.checkText(elements[i], values[i] + additionalText, contains);
			i = i + 1;
		}
		return true;
	};

	// check if an attribute of an element has expected value
	this.select = function(elementBy, value) {
		browser.driver.wait(this.isDisplayed(elementBy));
		element(elementBy).isDisplayed().then(function(isPresent) {
			expect(isPresent).toBe(true);
			console.log('Selecting value: \'' + value + '\', in field: ' + elementBy);
			try {
				element(elementBy).element(by.css("[label='" + value + "']")).click();
			} catch (e) {
				browser.driver.sleep(1000);
				element(elementBy).element(by.css("[label='" + value + "']")).click();
			}
		});
	};

	// check if an attribute of an element has expected value
	this.selectByNum = function(element, optionNum) {
		if (optionNum) {
			var options = element.findElements(by.tagName('option')).then(function(options) {
				options[optionNum].click();
			});
		}
	};

	// switch to frame
	this.switchToFrame = function(byElement) {
		browser.switchTo().frame(browser.driver.findElement(byElement));
	};

	// switch to default frame
	this.switchToDefault = function() {
		browser.switchTo().defaultContent();
	};

	// check requred fields validation
	// http://www.benheymink.com/blog/?p=114
	this.checkValidation = function(errorElements, expectedErrors, suffix) {
		if (suffix == null) {
			suffix = '';
		}
		this.isDisplayed(errorElements).then(function(displayed) {
			expect(displayed).toBe(true);
			element.all(errorElements).map(function(elm) {
				var commonfunctions = new commonFunctions();
				return commonfunctions.getTextPromiseElement(elm);
			}).then(function(texts) {
				expect(expectedErrors.length).toEqual(texts.length);
				var sortedExpected = expectedErrors.slice(0).sort();
				var sortedActual = texts.slice(0).sort();
				var i = 0;
				sortedActual.forEach(function(item) {
					console.log('Actual: ' + item + ', Expected: ' + sortedExpected[i] + suffix);
					expect(item).toContain(sortedExpected[i] + suffix);
					i = i + 1;
				});
			});
		});
	}

	// wait for Angular page to load
	this.waitAngular = function(expectedUrl, timeout) {
		var loaded = false;

		browser.wait(function() {
			browser.executeScript(function() {
				return {
					url : window.location.href,
					haveAngular : !!window.angular
				};
			}).then(function(obj) {
				loaded = (obj.url == expectedUrl && obj.haveAngular);
			});

			return loaded;
		}, timeout);
	};

	/**
	 * @name waitForUrlToChangeTo
	 * @description Wait until the URL changes to match a provided regex
	 * @param {RegExp}
	 *            urlRegex wait until the URL changes to match this regex
	 * @returns {!webdriver.promise.Promise} Promise
	 */
	this.waitUrl = function(urlExpected) {
		var currentUrl;
		return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
			currentUrl = url;
		}).then(function waitForUrlToChangeTo() {
			return browser.wait(function waitForUrlToChangeTo() {
				return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
					browser.driver.sleep(2000);
					var commonfunctions = new commonFunctions();
					console.log(urlExpected + ' :expected actual: ' + currentUrl);
					return commonfunctions.contains(url, urlExpected);
				});
			});
		});
	}

	// Saves a product url to the properties file
	this.saveProductUrl = function(url) {
		var urlUpdated = url.replace(browser.params.prodUrl, browser.baseUrl).replace("http:", "https:");
		var propertiesFile = __dirname.replace('common', '') + browser.params.propertiesFile;
		this.writeFile(propertiesFile, urlUpdated);
	};

	// Gets a product url from the properties file
	this.getProductUrl = function() {
		var propertiesFile = __dirname.replace('common', '') + browser.params.propertiesFile;
		return this.readFile(propertiesFile);
	};

	/**
	 * 
	 * Core functions
	 * 
	 */

	// Returns a random number between min (inclusive) and max (exclusive)
	this.getRandomNumber = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};

	// Returns a true if a string contains another string
	this.contains = function(containing, contained) {
		console.log('result:' + (containing.indexOf(contained) > -1));
		return (containing.indexOf(contained) > -1);
	};

	this.writeFile = function(filePath, text) {
		console.log('Writing to file: ' + filePath + ', text: ' + text);
		var fs = require('fs');
		fs.writeFileSync(filePath, text);
	};

	// Read local text file to a string
	this.readFile = function(filePath) {
		console.log('Reading from file: ' + filePath);
		var fs = require('fs');
		return fs.readFileSync(filePath).toString();
	}

};

module.exports = new commonFunctions();
