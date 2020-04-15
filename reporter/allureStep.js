const Allure = {
    async allureStep(stepDefinition, method) {
        await allure.createStep(stepDefinition, async function() {
            try {
                await method();
            } catch (error) {
                throw error;
            }
        })();
    }
}

module.exports = {Allure};