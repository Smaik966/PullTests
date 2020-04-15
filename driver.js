const {Builder, By, Key, until} = require('selenium-webdriver');

let Singletone = (function () {

    let instance;

    return function Construct_singletone () {
        if (instance) {
            return instance;
        }
        if (this && this.constructor === Construct_singletone) {
            instance = new Builder().forBrowser('chrome').build();
            return instance;
        } else {
            return new Construct_singletone();
        }
    }
}());

module.exports = Singletone();