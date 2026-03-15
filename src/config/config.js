module.exports = {
  baseUrl: 'https://tutorialsninja.com/demo/index.php?route=common/home',
  timeout: 30000,
  headless: false,
  slowMo: 0,
  viewport: {
    width: 1920,
    height: 1080
  },
  screenshotPath: './src/screenshots',
  browser: process.env.BROWSER || 'chromium'
};
