const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  // try {
  await driver.get('https://www.baidu.com');

  await driver.findElement(By.id('kw')).sendKeys('激战2', Key.ENTER);
  console.log(await driver.wait(until.titleIs('激战2_百度搜索'), 1000))
  // } finally {
  //   await driver.quit();
  // }
})();   
