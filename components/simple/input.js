const {By, Key, until} = require('selenium-webdriver');
const driver = require('../../driver');

const Input = {
    inputByLabel(label){
        return driver.findElement(By.xpath(`//label[normalize-space() = '${label}']/../input`));
    }
}

module.exports = {Input}