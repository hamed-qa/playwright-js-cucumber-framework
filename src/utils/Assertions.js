const { expect } = require('@playwright/test');

class Assertions {
  constructor(page) {
    this.page = page;
  }

  async toBeVisible(locator) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async toBeHidden(locator) {
    await expect(this.page.locator(locator)).toBeHidden();
  }

  async toBeEnabled(locator) {
    await expect(this.page.locator(locator)).toBeEnabled();
  }

  async toBeDisabled(locator) {
    await expect(this.page.locator(locator)).toBeDisabled();
  }

  async toBeChecked(locator) {
    await expect(this.page.locator(locator)).toBeChecked();
  }

  async toBeUnchecked(locator) {
    await expect(this.page.locator(locator)).not.toBeChecked();
  }

  async toHaveText(locator, text) {
    await expect(this.page.locator(locator)).toHaveText(text);
  }

  async toContainText(locator, text) {
    await expect(this.page.locator(locator)).toContainText(text);
  }

  async toHaveValue(locator, value) {
    await expect(this.page.locator(locator)).toHaveValue(value);
  }

  async toHaveAttribute(locator, attribute, value) {
    await expect(this.page.locator(locator)).toHaveAttribute(attribute, value);
  }

  async toHaveClass(locator, className) {
    await expect(this.page.locator(locator)).toHaveClass(className);
  }

  async toHaveCount(locator, count) {
    await expect(this.page.locator(locator)).toHaveCount(count);
  }

  async toHaveURL(url) {
    await expect(this.page).toHaveURL(url);
  }

  async toHaveTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async toContainURL(urlPart) {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  async toBePresent(locator) {
    const count = await this.page.locator(locator).count();
    expect(count).toBeGreaterThan(0);
  }

  async toBeAbsent(locator) {
    const count = await this.page.locator(locator).count();
    expect(count).toBe(0);
  }

  async toHaveCSS(locator, property, value) {
    await expect(this.page.locator(locator)).toHaveCSS(property, value);
  }

  async toBeFocused(locator) {
    await expect(this.page.locator(locator)).toBeFocused();
  }

  async toBeEmpty(locator) {
    await expect(this.page.locator(locator)).toBeEmpty();
  }

  async toBeEditable(locator) {
    await expect(this.page.locator(locator)).toBeEditable();
  }

  async textToBe(locator, expectedText) {
    const actualText = await this.page.textContent(locator);
    expect(actualText).toBe(expectedText);
  }

  async textToContain(locator, expectedText) {
    const actualText = await this.page.textContent(locator);
    expect(actualText).toContain(expectedText);
  }

  async attributeToBe(locator, attribute, expectedValue) {
    const actualValue = await this.page.getAttribute(locator, attribute);
    expect(actualValue).toBe(expectedValue);
  }

  async valueToBe(locator, expectedValue) {
    const actualValue = await this.page.inputValue(locator);
    expect(actualValue).toBe(expectedValue);
  }

  async elementCountToBe(locator, expectedCount) {
    const count = await this.page.locator(locator).count();
    expect(count).toBe(expectedCount);
  }

  async isVisible(locator) {
    return await this.page.isVisible(locator);
  }

  async isHidden(locator) {
    return await this.page.isHidden(locator);
  }

  async isEnabled(locator) {
    return await this.page.isEnabled(locator);
  }

  async isDisabled(locator) {
    return await this.page.isDisabled(locator);
  }

  async isChecked(locator) {
    return await this.page.isChecked(locator);
  }
}

module.exports = Assertions;
