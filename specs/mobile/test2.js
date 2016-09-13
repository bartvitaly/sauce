var common = require('../../common/common.js');

var str = "https://ew693j-vs-dev-staging-viralstyle.runnableapp.com/user1473351026847/1473354109";

var last = str.split("/")[str.split("/").length - 1];

// var webdriver = require('selenium-webdriver'), SeleniumServer =
// require('selenium-webdriver/remote').SeleniumServer, assert =
// require('assert'),
//
// // change the next two vars to match your filesystem
// selendroidPath =
// 'C:/work/com.viralstyle/selendroid/selendroid-standalone-0.17.0-with-dependencies.jar',
// // symbolic
// // linked to
// // selendroid-standalone-0.12.0-with-dependencies.jar
//
// appPath = 'C:/work/com.viralstyle/apk/flite.apk', caps = {
// browserName : 'selendroid',
// aut : 'com.facebook.katana:89.0.0.17.70'
// }, driver = new
// webdriver.Builder().withCapabilities(caps).usingServer(getServer()).build();
//
// function getServer() {
// var server = new SeleniumServer(selendroidPath, {
// port : 4444,
// stdio : 'inherit',
// args : [ '-app', 'C:/work/com.viralstyle/apk/flite.apk' ]
// });
// server.start();
// return server.address();
// }
//
// driver.get('and-activity://com.facebook.katana.mainActivity');
// driver.getCurrentUrl().then(function(currentUrl) {
// assert.equal(currentUrl, 'and-activity://FBMainTabActivitys')
// });
//
// var fbPrefix = 'com.facebook.lite:id/';
// var username = 'login_username';
//
// driver.switchTo().window("NATIVE_APP");
// driver.findElement(webdriver.By.xpath("//*[@id='" + username +
// "']")).then(function(myTextField) {
// driver.getPageSource().then(function(myTextField) {
// console.log(myTextField);
// });
// myTextField.click();
// myTextField.sendKeys('Hello Selendroid');
// return myTextField.getText();
// }).then(function(text) {
// assert.equal(text, 'Hello Selendroid');
// });
//
// driver.quit();
