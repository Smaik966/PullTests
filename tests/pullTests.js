const {Builder, By, Key, until} = require('selenium-webdriver');
require('../reporter/allure.conf');
const driver = require('../driver');
const {Login} = require('../components/login');
const {Data} = require('../testData/testData')
const {UserElements} = require('../elements/userElements');
const {Link} = require('../components/simple/link');
const {Lang} = require('../components/language');
const {DropDown} = require('../components/simple/dropDown');
const {GlobalLogic} = require('../logic/globalLogic')
const {Allure} = require('../reporter/allureStep')

describe('пул тестов',  function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000;

    let defaultImplicit = 15000;
    driver.manage().setTimeouts({implicit: defaultImplicit});


    beforeAll(async function() {
        await driver.get('https://yandex.by/');
    });

    afterAll(async function () {
        await driver.quit();
    });


    it('- Логин на яндекс почту', async function() {
        await Allure.allureStep(`Вход на почту`, async ()=>{
            await Login.loginEmail(Data.testUser.login, Data.testUser.password);
        });
        await Allure.allureStep(`Проверка пользователя`, async ()=>{
            await expect(await UserElements.mailUser().getText()).toBe(Data.testUser.login);
        });
    });

    it('- Яндекс почта - логаут', async function() {
        await Allure.allureStep(`Вход на почту`, async ()=> {
            await Login.loginEmail(Data.testUser.login, Data.testUser.password);
        });
        await Allure.allureStep(`Выход из аккаунта`, async ()=> {
            await Login.logoutEmail();
        });
        await Allure.allureStep(`Проверка что произошол выход из аккаунта`, async ()=> {
            await expect(await Link.linkBySpan(Data.button.enterInMail).isDisplayed()).toBe(true);
        });
    });

    it('- Яндекс почта - невалидный пароль', async function () {
        await Login.loginEmail(Data.testUser.login, Data.testUser.noValPassword);
        await expect(await Login.verificationError().getText()).toBe(Data.error.wrongPass);
    });

    it('- Яндекс почта - невалидный логин', async function() {
        await Login.wrongLoginEmail(Data.testUser.noValLogin, Data.testUser.password);
        await expect(await Login.verificationError().getText()).toBe(Data.error.wrongLogin);
    });

    it('- Яндекс - навигация', async function () {
        async function checkTab(tab, title){
            await GlobalLogic.switchToNextWin(await Link.linkByText(tab).click());
            await expect(await driver.wait(until.titleContains(title)), 10000).toBe(true);
            await GlobalLogic.switchToPreWin();
        }

        await Allure.allureStep(`Проверяем ${Data.homeTab.video}`, async ()=> {
            await checkTab(Data.homeTab.video, Data.title.video);
        });
        await Allure.allureStep(`Проверяем ${Data.homeTab.images}`, async ()=> {
            await checkTab(Data.homeTab.images, Data.title.images);
        });
        await Allure.allureStep(`Проверяем ${Data.homeTab.news}`, async ()=> {
            await checkTab(Data.homeTab.news, Data.title.news);
        });
        await Allure.allureStep(`Проверяем ${Data.homeTab.map}`, async ()=> {
            await checkTab(Data.homeTab.map, Data.title.map);
        });
        await Allure.allureStep(`Проверяем ${Data.homeTab.market}`, async ()=> {
            await checkTab(Data.homeTab.market, Data.title.market);
        });
        await Allure.allureStep(`Проверяем ${Data.homeTab.translator}`, async ()=> {
            await checkTab(Data.homeTab.translator, Data.title.translator);
        });
        await Allure.allureStep(`Проверяем ${Data.homeTab.music}`, async ()=> {
            await checkTab(Data.homeTab.music, Data.title.music);
        });
    });

    it('- Яндекс - переключение языка на английский', async function () {
        await Allure.allureStep('Переходим на выбор языка', async ()=>{
            await Lang.homeSwitchLang(Data.language.add);
        });

        await Allure.allureStep('Выбираем язык', async ()=>{
            await Lang.switchLang(Data.language.english);
        });

        await Allure.allureStep(`Проверяем смену языка`,async ()=>{
            await expect(await DropDown.homeLangDrop().getText()).toEqual(Data.language.eng);
        });
    });

});