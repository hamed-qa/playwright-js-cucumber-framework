const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../pages/HomePage');

Given('I am on the home page', async function () {
  this.homePage = new HomePage(this.page);
});

Then('I should see the logo', async function () {
  await this.homePage.verifyLogoVisible();
});

When('I search for {string}', async function (searchQuery) {
  await this.homePage.search(searchQuery);
});

Then('I should see search results', async function () {
  await this.homePage.actions.waitForElement('.product-layout');
  await this.homePage.assertions.toContainURL('search');
});
