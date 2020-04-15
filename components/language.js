const driver = require('../driver');
const {By, Key, until} = require('selenium-webdriver');
const {DropDown} = require('../components/simple/dropDown');
const {Link} = require('../components/simple/link');
const {Button} = require('../components/simple/button');
const {Waiters} = require('../helpers/waiters')

const Lang = {
    saveLang() {
        return driver.findElement(By.css('.form__save'));
    },

    async homeSwitchLang(lang) {
        await DropDown.openAndSelectElement(DropDown.homeLangDrop(), Link.linkBySpan(lang));
    },

    async switchLang(lang) {
      /* await DropDown.openAndSelectElement(DropDown.selectLangButton(), DropDown.langDropButton(lang));
        await this.saveLang().click();*/

        await DropDown.selectLangButton().click();
        await DropDown.langDropButton(lang).click().then(await this.saveLang().click());
    }
}

module.exports = {Lang}