const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AllureReporter {
  constructor() {
    this.resultsDir = './allure-results';
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
    this.currentTest = null;
    this.currentStep = null;
  }

  startTest(testName) {
    const browserName = require('../config/config').browser;
    this.currentTest = {
      uuid: this.generateUUID(),
      name: testName,
      status: 'passed',
      stage: 'running',
      start: Date.now(),
      steps: [],
      attachments: [],
      labels: [
        { name: 'framework', value: 'cucumber' },
        { name: 'language', value: 'javascript' },
        { name: 'suite', value: 'E2E Tests' },
        { name: 'testType', value: 'functional' },
        { name: 'severity', value: 'normal' },
        { name: 'owner', value: 'QA Team' },
        { name: 'browser', value: browserName }
      ],
      links: []
    };
  }

  startStep(stepName) {
    if (this.currentTest) {
      this.currentStep = {
        name: stepName,
        status: 'passed',
        stage: 'running',
        start: Date.now(),
        steps: []
      };
    }
  }

  endStep(status, error) {
    if (this.currentStep && this.currentTest) {
      this.currentStep.status = status;
      this.currentStep.stage = 'finished';
      this.currentStep.stop = Date.now();
      
      if (error) {
        this.currentStep.statusDetails = {
          message: error.message || 'Step failed',
          trace: error.stack || ''
        };
      }
      
      this.currentTest.steps.push(this.currentStep);
      this.currentStep = null;
    }
  }

  endTest(status, error) {
    if (this.currentTest) {
      this.currentTest.status = status;
      this.currentTest.stage = 'finished';
      this.currentTest.stop = Date.now();
      
      if (error) {
        this.currentTest.statusDetails = {
          message: error.message || 'Test failed',
          trace: error.stack || ''
        };
      }
      
      this.writeTestResult();
    }
  }

  addScreenshot(name, screenshot) {
    if (this.currentTest && screenshot) {
      const fileName = `${this.generateUUID()}-attachment.png`;
      const filePath = path.join(this.resultsDir, fileName);
      
      fs.writeFileSync(filePath, screenshot);
      
      this.currentTest.attachments.push({
        name: name,
        type: 'image/png',
        source: fileName
      });
    }
  }

  writeTestResult() {
    if (this.currentTest) {
      const fileName = `${this.currentTest.uuid}-result.json`;
      const filePath = path.join(this.resultsDir, fileName);
      
      const result = {
        uuid: this.currentTest.uuid,
        historyId: this.generateHistoryId(this.currentTest.name),
        name: this.currentTest.name,
        fullName: this.currentTest.name,
        description: `Automated test for: ${this.currentTest.name}`,
        status: this.currentTest.status,
        stage: this.currentTest.stage,
        start: this.currentTest.start,
        stop: this.currentTest.stop,
        steps: this.currentTest.steps,
        labels: this.currentTest.labels,
        links: this.currentTest.links,
        attachments: this.currentTest.attachments
      };
      
      if (this.currentTest.statusDetails) {
        result.statusDetails = this.currentTest.statusDetails;
      }
      
      fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    }
  }

  generateUUID() {
    return crypto.randomBytes(16).toString('hex');
  }

  generateHistoryId(name) {
    return crypto.createHash('md5').update(name).digest('hex');
  }
}

const allureReporter = new AllureReporter();

Before({ order: 0 }, function ({ pickle }) {
  console.log(`\n🧪 Starting Test: ${pickle.name}`);
  allureReporter.startTest(pickle.name);
});

BeforeStep(function ({ pickleStep }) {
  allureReporter.startStep(pickleStep.text);
});

AfterStep(function ({ pickleStep, result }) {
  let status = 'passed';
  let error = null;

  if (result.status === Status.FAILED) {
    status = 'failed';
    error = result.message ? new Error(result.message) : new Error('Step failed');
  } else if (result.status === Status.PASSED) {
    status = 'passed';
  } else if (result.status === Status.SKIPPED) {
    status = 'skipped';
  }

  allureReporter.endStep(status, error);
});

After({ order: 1000 }, async function (scenario) {
  let status = 'passed';
  let error = null;

  if (scenario.result) {
    if (scenario.result.status === Status.FAILED) {
      status = 'failed';
      error = scenario.result.message ? new Error(scenario.result.message) : new Error('Test failed');
      console.log(`\n❌ Test Failed: ${scenario.pickle.name}`);
    } else if (scenario.result.status === Status.PASSED) {
      status = 'passed';
      console.log(`\n✅ Test Passed: ${scenario.pickle.name}`);
    } else {
      status = 'skipped';
      console.log(`\n⏭️ Test Skipped: ${scenario.pickle.name}`);
    }
  }

  // Add screenshot to Allure only for failed tests
  if (this.screenshot && scenario.result.status === Status.FAILED) {
    allureReporter.addScreenshot('Failure Screenshot', this.screenshot);
  }

  allureReporter.endTest(status, error);
});

module.exports = allureReporter;
