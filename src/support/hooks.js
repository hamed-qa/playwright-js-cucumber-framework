const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');
require('./allureReporter');

setDefaultTimeout(120000);

Before({ timeout: 120000, order: 1 }, async function () {
  const { chromium, firefox, webkit } = require('@playwright/test');
  const browserType = config.browser;
  
  let browser;
  if (browserType === 'firefox') {
    browser = firefox;
  } else if (browserType === 'webkit') {
    browser = webkit;
  } else {
    browser = chromium;
  }
  
  this.browser = await browser.launch({ 
    headless: config.headless,
    slowMo: config.slowMo
  });
  this.context = await this.browser.newContext({ 
    viewport: config.viewport 
  });
  this.page = await this.context.newPage();
  await this.page.goto(config.baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
});

After({ timeout: 120000, order: 0 }, async function (scenario) {
  try {
    // Take screenshot only for failed tests
    if (this.page && scenario.result.status === 'FAILED') {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = `${scenario.pickle.name.replace(/\s+/g, '_')}_${timestamp}.png`;
      const screenshotPath = path.join(config.screenshotPath, screenshotName);
      
      if (!fs.existsSync(config.screenshotPath)) {
        fs.mkdirSync(config.screenshotPath, { recursive: true });
      }
      
      // Take screenshot and store it
      this.screenshot = await this.page.screenshot({ fullPage: true });
      fs.writeFileSync(screenshotPath, this.screenshot);
    }
    
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  } catch (error) {
    console.log('Error in After hook:', error.message);
    // Force close browser even if error occurs
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (e) {
      console.log('Force close error:', e.message);
    }
  }
});
