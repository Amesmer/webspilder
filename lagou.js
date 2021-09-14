const { Builder, By, Key, until } = require('selenium-webdriver');

let currentPageNum = 1;
let maxPageNum = 1;
let driver 
(async function example() {
 driver = await new Builder().forBrowser('chrome').build();

  // try {
  await driver.get('https://www.lagou.com');
  await driver.findElement(By.css('#changeCityBox  ul.clearfix>li:nth-child(2)')).click();
  await driver.findElement(By.id('search_input')).sendKeys('前端', Key.ENTER);
  maxPageNum = await driver.findElement(By.css('.item_con_pager .pager_container span:nth-child(5)')).getText()
  getData()
})();   
async function getData() {
    console.log(`正在获取第${currentPageNum}页的数据, 共${maxPageNum}页`)
    while (true) {
      let flag = true
      try {
        let items = await driver.findElements(By.className('con_list_item'))
        let results = []
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          // 获取岗位名称
          let title = await item.findElement(By.css('.p_top h3')).getText()
          // 获取工作地点
          let position = await item.findElement(By.css('.p_top em')).getText()
          // 获取发布时间
          let time = await item.findElement(By.css('.p_top .format-time')).getText()
          // 获取公司名称
          let companyName = await item.findElement(By.css('.company .company_name')).getText()
          // 获取公司所在行业
          let industry = await item.findElement(By.css('.company .industry')).getText()
          // 获取薪资待遇
          let money = await item.findElement(By.css('.p_bot .money')).getText()
          // 获取需求背景
          let background = await item.findElement(By.css('.p_bot .li_b_l')).getText()
          // 处理需求背景
          background = background.replace(money, '')
          // console.log(id, job, area, money, link, need, companyLink, industry, tags, welfare)
          results.push({
            title,
            position,
            time,
            companyName,
            industry,
            money,
            background
          })
        }
  
        console.log(results)
  
        currentPageNum++
        if (currentPageNum <= maxPageNum) {
          await driver.findElement(By.className('pager_next')).click()
          await getData(driver)
        }
      } catch (e) {
        // console.log(e.message)
        if (e) flag = false
      } finally {
        if (flag) break
      }
    }
  }