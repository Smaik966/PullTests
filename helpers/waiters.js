const driver = require('../driver');

const Waiters = {
    async waitElemInDOM(element, time) {
        let defaultTime = await driver.manage().getTimeouts();
        await driver.manage().setTimeouts({implicit: time});
        await driver.manage().setTimeouts({implicit: defaultTime.implicit});
    }
}

module.exports = {Waiters};