const {By, Key, until} = require('selenium-webdriver');
const driver = require('../../driver');
const {Allure} = require('../../reporter/allureStep')


const DropDown = {

    async openAndSelectElement(drop, element){
        await Allure.allureStep(`Выбор элемента ${await drop.getText()} в дропдаун меню ${await element.getText()}`, async ()=> {
            await drop.click();
            await element.click();
        });
    },

    homeLangDrop(){
        return driver.findElement(By.xpath(`//a[@title and @role = 'button']`));
    },

    selectLangButton(){
        return driver.findElement(By.css('.select__button'));
    },

    langDropButton(lang) {
        return driver.findElement(By.xpath(`//div[normalize-space() = '${lang}']`));
    }

}

module.exports = {DropDown}