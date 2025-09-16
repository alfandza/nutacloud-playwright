// Import the test fixture
const { test, expect } = require('./pages/test_fixture.js');

require('dotenv').config();

//Test Describe
test.describe('Login Test Suite', () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto(login.nutacloudWebsite);
    await page.waitForLoadState('load');
  });

  // login valid
  test('Login with valid credentials', async ({ page, login }) => {
    await login.loginNuta(process.env.NAMA_PERUSAHAAN, process.env.USERNAME, process.env.PASSWORD);
    await page.waitForLoadState('load');
    await expect(page).toHaveURL("https://nutacloud.com/cloud/main");
  });

  // login invalid multiple
  [   
    { name: 'Login with Invalid Company', namaPerusahaan: 'iajodqu9h1', username: 'Amina', password: '123456789', expected: 'Nama Perusahaan tidak terdaftar.' },
    { name: 'Login with Invalid Username', namaPerusahaan: 'TestBisnisAb', username: 'Amina', password: '123456789', expected: 'Username tidak terdaftar.' },
    { name: 'Login with Invalid Password', namaPerusahaan: 'TestBisnisAb', username: process.env.USERNAME, password: '123456789', expected: 'Password salah.' },
    { name: 'No Input', namaPerusahaan: '', username: '', password: '', expected: 'Nama Perusahaan tidak terdaftar.' }
  ].forEach(({ name, namaPerusahaan, username, password, expected }) => {
      test(`Testing Invalid with ${name}`, async ({ page, login }) => {
          await login.loginNuta(namaPerusahaan, username, password);

          await login.errorCheck(name, expected);
      });
  });
});