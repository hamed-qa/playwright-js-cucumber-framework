class Actions {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    await this.page.click(locator);
  }

  async doubleClick(locator) {
    await this.page.dblclick(locator);
  }

  async rightClick(locator) {
    await this.page.click(locator, { button: 'right' });
  }

  async fill(locator, text) {
    await this.page.fill(locator, text);
  }

  async type(locator, text, delay = 100) {
    await this.page.type(locator, text, { delay });
  }

  async clear(locator) {
    await this.page.fill(locator, '');
  }

  async selectOption(locator, value) {
    await this.page.selectOption(locator, value);
  }

  async check(locator) {
    await this.page.check(locator);
  }

  async uncheck(locator) {
    await this.page.uncheck(locator);
  }

  async hover(locator) {
    await this.page.hover(locator);
  }

  async scrollToElement(locator) {
    await this.page.locator(locator).scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollBy(x, y) {
    await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
  }

  async press(locator, key) {
    await this.page.press(locator, key);
  }

  async focus(locator) {
    await this.page.focus(locator);
  }

  async blur(locator) {
    await this.page.evaluate((selector) => {
      document.querySelector(selector).blur();
    }, locator);
  }

  async dragAndDrop(sourceLocator, targetLocator) {
    await this.page.dragAndDrop(sourceLocator, targetLocator);
  }

  async uploadFile(locator, filePath) {
    await this.page.setInputFiles(locator, filePath);
  }

  async getText(locator) {
    return await this.page.textContent(locator);
  }

  async getAttribute(locator, attribute) {
    return await this.page.getAttribute(locator, attribute);
  }

  async getValue(locator) {
    return await this.page.inputValue(locator);
  }

  async waitForElement(locator, timeout = 30000) {
    await this.page.waitForSelector(locator, { timeout });
  }

  async waitForElementHidden(locator, timeout = 30000) {
    await this.page.waitForSelector(locator, { state: 'hidden', timeout });
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  async switchToFrame(frameLocator) {
    return this.page.frameLocator(frameLocator);
  }

  async acceptAlert() {
    this.page.on('dialog', dialog => dialog.accept());
  }

  async dismissAlert() {
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  async getAlertText() {
    return new Promise((resolve) => {
      this.page.on('dialog', dialog => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
  }
}

module.exports = Actions;
