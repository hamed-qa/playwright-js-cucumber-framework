const fs = require('fs');
const path = require('path');
const config = require('./src/config/config');

const browserName = config.browser.charAt(0).toUpperCase() + config.browser.slice(1);

const envContent = `Browser=${browserName}
Framework=Cucumber
Language=JavaScript
Node.Version=${process.version}
Playwright.Version=1.49.0
Base.URL=${config.baseUrl}
Test.Environment=QA
`;

const envPath = path.join(__dirname, 'allure-results', 'environment.properties');

if (!fs.existsSync(path.join(__dirname, 'allure-results'))) {
  fs.mkdirSync(path.join(__dirname, 'allure-results'), { recursive: true });
}

fs.writeFileSync(envPath, envContent);
console.log(`✅ Environment configured for ${browserName}`);
