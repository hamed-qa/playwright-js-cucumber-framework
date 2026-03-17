# Playwright-Cucumber BDD Framework

A professional test automation framework using Playwright with Cucumber BDD, featuring comprehensive reporting with Allure.

## Project Structure

```
playwright-js/
├── src/
│   ├── features/          # Feature files (Gherkin scenarios)
│   ├── steps/             # Step definitions
│   ├── pages/             # Page Object Model (web elements)
│   ├── config/            # Environment configuration (baseUrl, browser, etc.)
│   ├── data/              # Test data
│   ├── screenshots/       # Screenshots for failed tests only
│   ├── support/           # Hooks, Allure reporter, and utilities
│   └── utils/             # Actions and Assertions helper classes
├── allure-results/        # Allure raw results
├── allure-report/         # Generated Allure HTML report
├── cucumber.js            # Cucumber configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Installation

```bash
npm install
```

## Configuration

- **Base URL**: `https://tutorialsninja.com/demo/index.php?route=common/home`
- **Browser**: Configurable (Chromium, Firefox, WebKit)
- **Settings**: Located in `src/config/config.js`

## Running Tests

### Run on specific browser:

```bash
# Run on Chromium (default)
npm run test:chromium

# Run on Firefox
npm run test:firefox

# Run on WebKit (Safari)
npm run test:webkit

# Run on ALL browsers sequentially
npm run test:all
```

### Run default tests:

```bash
npm test
```

## Generate Allure Report

```bash
npm run report
```

The report will automatically open in your browser with the title:
**Automation tests report - DD/MM/YYYY**

## Features

### Core Features
- ✅ Playwright with Cucumber BDD
- ✅ Page Object Model pattern
- ✅ Multi-browser support (Chromium, Firefox, WebKit)
- ✅ Automatic screenshots for failed tests only
- ✅ Allure HTML reports with rich metadata
- ✅ Test history and trend analysis
- ✅ Centralized configuration
- ✅ Test data management
- ✅ Hooks for setup/teardown

### Utility Classes
- **Actions.js**: Reusable methods for web element interactions
  - Click, double-click, right-click
  - Fill, type, clear
  - Scroll, hover, drag-and-drop
  - File upload, alerts handling
  - Wait operations

- **Assertions.js**: Reusable methods for verifications
  - Visibility checks
  - Text and value assertions
  - Attribute validations
  - Element state checks
  - URL and title verifications

### Allure Report Features
- 📊 Test execution overview with graphs
- 📈 Historical trends across multiple runs
- 🏷️ Test categorization (Product defects, Timeout issues, etc.)
- 🖼️ Screenshots attached to failed tests
- 🔍 Detailed step-by-step execution
- 🌐 Browser information in metadata
- ⏱️ Execution time tracking
- 📝 Environment details (Browser, Framework, Node version, etc.)

## Console Output

During test execution, you'll see:

```
🧪 Starting Test: Verify home page loads successfully

✅ Test Passed: Verify home page loads successfully

🧪 Starting Test: Search for a product

❌ Test Failed: Search for a product
```

## Test Execution Behavior

- Tests continue running even if one fails
- Browser automatically closes after each test
- Screenshots captured only for failed tests
- All results aggregated in Allure report

## Project Best Practices

1. **Separation of Concerns**: Page objects, step definitions, and utilities are separated
2. **Reusability**: Common actions and assertions in utility classes
3. **Maintainability**: Centralized configuration and locators
4. **Readability**: Clear Gherkin scenarios and descriptive method names
5. **Reporting**: Comprehensive Allure reports with metadata and history

## Supported Browsers

- **Chromium** (Chrome, Edge)
- **Firefox**
- **WebKit** (Safari)

## Requirements

- Node.js v14 or higher
- npm or yarn

## Author

Hamed ABID

## License

ISC
