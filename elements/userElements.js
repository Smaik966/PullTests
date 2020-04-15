const {By, Key, until} = require('selenium-webdriver');
const driver = require ('../driver');

const UserElements = {
    mailUser(){
        return driver.findElement(By.css('.mail-User-Name'));
    }
}

module.exports = {UserElements};