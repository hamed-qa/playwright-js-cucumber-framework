const Actions = require('../utils/Actions');
const Assertions = require('../utils/Assertions');

class HomePage {
  constructor(page) {
    this.page = page;
    this.actions = new Actions(page);
    this.assertions = new Assertions(page);
    
    // Locators
    this.searchBox = 'input[name="search"]';
    this.searchButton = 'button.btn-default';
    this.logo = '#logo';
    this.myAccountDropdown = 'a[title="My Account"]';
    this.registerLink = 'a[href*="register"]';
    this.loginLink = 'a[href*="login"]';
  }

  async search(query) {
    await this.actions.fill(this.searchBox, query);
    await this.actions.click(this.searchButton);
  }

  async clickMyAccount() {
    await this.actions.click(this.myAccountDropdown);
  }

  async clickRegister() {
    await this.actions.click(this.registerLink);
  }

  async clickLogin() {
    await this.actions.click(this.loginLink);
  }

  async verifyLogoVisible() {
    await this.assertions.toBeVisible(this.logo);
  }

  async verifySearchBoxPresent() {
    await this.assertions.toBePresent(this.searchBox);
  }
}

module.exports = HomePage;
