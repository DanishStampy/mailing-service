const { Builder, By } = require('selenium-webdriver');
require('chromedriver');

const chrome = require('selenium-webdriver/chrome');
const options = new chrome.Options();
options.addArguments('headless');
options.addArguments('disable-gpu');
options.addArguments('no-sandbox');
options.addArguments('disable-dev-shm-usage');
options.addArguments('ignore-certificate-errors');
options.addArguments('verbose');

describe('Test sending email', function() {
  this.timeout(60000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  afterEach(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('Test sending email', async function() {
    try {
        await driver.get("http://app:8000/");
        await driver.findElement(By.id("email")).sendKeys("aiman@gmail.com");
        await driver.findElement(By.id("message")).sendKeys("Test email sent 3");
        await driver.findElement(By.css("button")).click();

    } catch (error) {
        await driver.get("http://app:8000/");
        await driver.findElement(By.id("email")).sendKeys("aiman@gmail.com");
        await driver.findElement(By.id("message")).sendKeys("Test email sent 3");
        await driver.findElement(By.css("button")).click();
    }
  });
});
