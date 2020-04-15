module.exports = (function() {
    const AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
        resultsDir: 'allure-results'
    }));
}());