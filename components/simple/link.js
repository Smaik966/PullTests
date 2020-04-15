const {By, Key, until} = require('selenium-webdriver');
const driver = require('../../driver');

const Link = {
    linkBySpan(span) {
        return driver.findElement(By.xpath(`//span[normalize-space() = '${span}']/../../a`));
    },

    linkByText(text) {
        return driver.findElement(By.xpath(`//a[normalize-space() = '${text}']`));
    },

    changeLangDrop(){
        return driver
    }
}

module.exports = {Link}