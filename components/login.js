const driver = require('../driver');
const {By, Key, until} = require('selenium-webdriver');
const {GlobalLogic} = require('../logic/globalLogic');
const {Link} = require('./simple/link');
const {Button} = require('./simple/button');
const {Input} = require('./simple/input');
const {Data} = require('../testData/testData');
const {UserElements} = require('../elements/userElements');
const {Allure} = require('./../reporter/allureStep')

const Login = {
    async logAndPass(input, text){
        await Allure.allureStep(`Вводим в поле '${input}' текст '${text}'`, async ()=> {
            await Input.inputByLabel(input).sendKeys(text);
            await Button.buttonBySpan(Data.button.enter).click();
        });
    },

    async loginEmail(log, pass){
        await Allure.allureStep(`Авторизируемся с логином '${log}' и паролем '${pass}'`, async ()=> {
            await GlobalLogic.switchToNextWin(Link.linkBySpan(Data.button.enterInMail).click());
            await this.logAndPass(Data.input.login, log);
            await this.logAndPass(Data.input.password, pass);
        });
    },

    async logoutEmail(){
        await Allure.allureStep(`Выходим из аккаунта`, async ()=> {
            await UserElements.mailUser().click();
            await Link.linkByText(Data.userEmailLink.logout).click();
        });
    },

    async wrongLoginEmail(log){
        await Allure.allureStep(`Авторизируемся с неверным логином '${log}'`, async ()=> {
            await GlobalLogic.switchToNextWin(Link.linkBySpan(Data.button.enterInMail).click());
            await this.logAndPass(Data.input.login, log);
        });
    },

    verificationError(){
        return driver.findElement(By.css('.passp-form-field__error'));
    }
}

module.exports = {Login};