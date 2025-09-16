// Init Test Case
const { test, expect } = require('@playwright/test');

class loginPage {
    constructor(page) {
        this.page = page;
        this.nutacloudWebsite = 'https://nutacloud.com/';
        this.namaPerusahaanField = this.page.locator("input[name='idperusahaan']");
        this.usernameField = this.page.locator("input[name='username']");
        this.passwordField = this.page.locator("input[name='password']");
        this.loginButton = this.page.locator("button[type='submit']");
        this.errorMessage = this.page.locator("span.form__error");
    }

    async loginNuta(namaPerusahaan, username, password){
        await expect(this.namaPerusahaanField).toBeVisible()
        await expect(this.usernameField).toBeVisible()
        await expect(this.passwordField).toBeVisible()

        await this.namaPerusahaanField.fill(namaPerusahaan);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click()
    }

    async errorCheck(name, expected){
        if (name === 'Login with Invalid Company' || name === 'No Input'){
            await expect(this.errorMessage.nth(0)).toHaveText(expected);
        } else if (name === 'Login with Invalid Username'){
            await expect(this.errorMessage.nth(1)).toHaveText(expected);
        } else if (name === 'Login with Invalid Password'){
            await expect(this.errorMessage.nth(2)).toHaveText(expected);
        }
    }
}

module.exports = loginPage;