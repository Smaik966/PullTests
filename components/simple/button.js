const {By, Key, until} = require('selenium-webdriver');
const driver = require('../../driver');

const Button = {
    buttonBySpan(span){
        return driver.findElement(By.xpath(`//span[normalize-space() = '${span}']/../../button`));
    }
}

module.exports = {Button}