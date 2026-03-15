const fs = require('fs');
const path = require('path');

// Create allure-report/history directory if it doesn't exist
const historyDir = path.join(__dirname, 'allure-report', 'history');
const resultsHistoryDir = path.join(__dirname, 'allure-results', 'history');

if (fs.existsSync(historyDir)) {
  // Copy history from previous report to current results
  if (!fs.existsSync(resultsHistoryDir)) {
    fs.mkdirSync(resultsHistoryDir, { recursive: true });
  }
  
  const files = fs.readdirSync(historyDir);
  files.forEach(file => {
    const srcPath = path.join(historyDir, file);
    const destPath = path.join(resultsHistoryDir, file);
    fs.copyFileSync(srcPath, destPath);
  });
}
