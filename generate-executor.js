const fs = require('fs');
const path = require('path');

const executorData = {
  name: "Local Execution",
  type: "local",
  buildOrder: Date.now(),
  buildName: `Automation tests report`,
  buildUrl: "http://localhost",
  reportUrl: "http://localhost",
  reportName: `Automation tests report`
};

const executorPath = path.join(__dirname, 'allure-results', 'executor.json');

if (!fs.existsSync(path.join(__dirname, 'allure-results'))) {
  fs.mkdirSync(path.join(__dirname, 'allure-results'), { recursive: true });
}

fs.writeFileSync(executorPath, JSON.stringify(executorData, null, 2));
