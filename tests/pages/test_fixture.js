const base = require('@playwright/test').test;
const loginPage = require('./login.js');

const test = base.extend({
    login: async ({ page }, use) => {
        const login = new loginPage(page);
        await use(login);
    }
});

module.exports = { test, expect: base.expect };