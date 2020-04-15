const driver = require('../driver');
const {Allure} = require('../reporter/allureStep')

const GlobalLogic = {
    async switchToNextWin(func) {
        await Allure.allureStep('Перехад на новое окно', async ()=>{
            await func;
            await driver.getAllWindowHandles().then((handles) => {
                driver.switchTo().window(handles[handles.length - 1])
            });
        });
    },

    async switchToPreWin() {
        await Allure.allureStep('Перехад на предыдущее окно', async ()=>{
            await driver.getAllWindowHandles().then((handles) => {
                driver.close();
                driver.switchTo().window(handles[handles.length - 2])
            });
        });
    }
}

module.exports = {GlobalLogic};