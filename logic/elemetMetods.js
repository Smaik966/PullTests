const {By, Key, until} = require('selenium-webdriver');
const {Allure} = require('../reporter/allureStep')

const ElemetMetods = {
    async elementExist(element) {
        await Allure.allureStep(`Проверяем существует ли ${element}`, async ()=>{
            try {
                await element;
                return true;
            } catch (NoSuchElementException) {
                return false;
            }
        });
    }
}

module.exports = {ElemetMetods};