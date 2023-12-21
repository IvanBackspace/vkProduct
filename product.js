const { links, nameProduct, description, imageLinks, price } = require('./arr');

async function main() {
  const clipboardy = await import('clipboardy');
  clipboardy.default.writeSync('Медицина');
}

async  function addBtn() {
  await page.waitForTimeout(1000);
  const buttonSelector = '.vkuiButton .vkuiButton__content';
  await page.waitForSelector(buttonSelector);
  await page.hover(buttonSelector);
  await page.waitForTimeout(3000);

  const x = 520;
  const y = 1018;
  await page.mouse.move(x, y);
  await page.mouse.click(x, y);
  await page.waitForTimeout(6000);
}

main();

const puppeteer = require('puppeteer');
(async () => {
  const browserURL = 'http://localhost:9222'; // URL для подключения к существующему браузеру
  const browser = await puppeteer.connect({ browserURL });
  const page = await browser.newPage();

  for (let y = 0; y < links.length; y++) {
    await page.goto(links[y])

    for (let i = 0; i < nameProduct.length; i++) {


      await page.waitForTimeout(4000);
      const selector = 'li[data-tab="market"] > a.ui_tab.ui_tab_new.ui_gallery_item';
      await page.waitForSelector(selector);
      await page.click(selector);
      await page.waitForTimeout(400);

      const selectorBtn = 'a.FlatButton.FlatButton--secondary.FlatButton--size-m[data-task-click="EcommMarketGroupSectionProducts/add_item_cta_click"]';

      const element = await page.$(selectorBtn);

      if (i === 0) {

        const selectorAdd = 'a.FlatButton.FlatButton--secondary.FlatButton--size-m[data-task-click="EcommMarketGroupSectionProducts/add_item_cta_click"]';

        try {
          const element = await page.$(selectorAdd);

          if (element) {
            await page.waitForSelector(selectorAdd);
            await page.click(selectorAdd);
          } else {
            console.log('Селектор не найден');   
            addBtn()     
          }
        } catch (error) {
          console.error('Произошла ошибка при поиске селектора:', error);
        }

      } else {
        await page.waitForTimeout(1000);
        addBtn()

      }
      // Заполнение полей товара

      // Ктегория
      const selectorAfter = '.vkuiFormField__after.vkuiInternalFormField__after svg';
      await page.waitForSelector(selectorAfter);
      await page.click(selectorAfter);
      await page.waitForTimeout(500);
      await page.keyboard.down('Control');
      await page.keyboard.press('V');
      await page.keyboard.up('Control');
      await page.waitForTimeout(1000);
      const x2 = 652;
      const y2 = 178;
      await page.mouse.move(x2, y2);
      await page.mouse.click(x2, y2);

      // Название товара
      await page.waitForTimeout(500);
      await page.type('#item_name', nameProduct[i]);
      await page.waitForTimeout(500);

      // Описание
      await page.type('#item_description', description[i]);
      await page.waitForTimeout(3000);

      // Изображение
      await page.click('.vkuiButton__content');
      await page.waitForTimeout(500);
      const filePath = imageLinks[i];
      await page.waitForSelector('input.file[type="file"]');
      const input = await page.$('input.file[type="file"]');
      await input.uploadFile(filePath);
      await page.waitForTimeout(1000);
      await page.click('#market_photo_crop_done');

      // Цена
      await page.waitForTimeout(500);
      await page.type('#item_price', price[i]);

      // Сохранить
      await page.waitForTimeout(1000);
      await page.click('.FlatButton.FlatButton--primary.FlatButton--size-m');
    }
    console.log(links[y])
  }

  await browser.disconnect();

})();